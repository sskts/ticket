import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { factory } from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';
import { SasakiService } from '../../../services/sasaki/sasaki.service';
import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'app-auth-register-payment',
    templateUrl: './auth-register-payment.component.html',
    styleUrls: ['./auth-register-payment.component.scss']
})
export class AuthRegisterPaymentComponent implements OnInit {

    public cardExpiration: {
        year: string[];
        month: string[];
    };
    public paymentForm: FormGroup;
    public isLoading: boolean;
    public securityCodeModal: boolean;
    public creditCardAlertModal: boolean;
    public registerProgramMembershipAlertModal: boolean;
    public disable: boolean;
    public programMemberships: factory.programMembership.IProgramMembership[];

    constructor(
        private router: Router,
        private elementRef: ElementRef,
        private formBuilder: FormBuilder,
        private user: UserService,
        private sasaki: SasakiService
    ) { }

    public async ngOnInit() {
        window.scrollTo(0, 0);
        this.isLoading = true;
        this.cardExpiration = {
            year: [],
            month: []
        };
        this.paymentForm = this.createForm();
        this.disable = false;
        this.creditCardAlertModal = false;
        this.registerProgramMembershipAlertModal = false;
        try {
            await this.sasaki.getServices();
            // 会員プログラム検索
            this.programMemberships = await this.sasaki.programMembership.search({});

            if (this.programMemberships.length === 0) {
                throw new Error('programMemberships is not found');
            }
            console.log('会員プログラム', this.programMemberships);
        } catch (err) {
            console.log(err);
            this.router.navigate(['/error', { redirect: '/auth/register/payment' }]);
        }
        this.isLoading = false;
    }

    /**
     * フォーム作成
     * @method createForm
     */
    private createForm() {
        const creditrCard = {
            cardNumber: { value: '', validators: [Validators.required, Validators.pattern(/^[0-9]+$/)] },
            cardExpirationMonth: { value: '01', validators: [Validators.required] },
            cardExpirationYear: { value: moment().format('YYYY'), validators: [Validators.required] },
            securityCode: { value: '', validators: [Validators.required] },
            holderName: { value: '', validators: [Validators.required] }
        };

        for (let i = 0; i < 12; i++) {
            const DIGITS = -2;
            this.cardExpiration.month.push(`0${String(i + 1)}`.slice(DIGITS));
        }
        for (let i = 0; i < 10; i++) {
            this.cardExpiration.year.push(moment().add(i, 'year').format('YYYY'));
        }

        return this.formBuilder.group({
            cardNumber: [creditrCard.cardNumber.value, creditrCard.cardNumber.validators],
            cardExpirationMonth: [creditrCard.cardExpirationMonth.value, creditrCard.cardExpirationMonth.validators],
            cardExpirationYear: [creditrCard.cardExpirationYear.value, creditrCard.cardExpirationYear.validators],
            securityCode: [creditrCard.securityCode.value, creditrCard.securityCode.validators],
            holderName: [creditrCard.holderName.value, creditrCard.holderName.validators]
        });
    }

    /**
     * フォーム確定
     * @method onSubmit
     */
    public async onSubmit() {
        if (this.disable) {
            return;
        }
        if (this.paymentForm.invalid) {
            // フォームのステータス変更
            this.paymentForm.controls.cardNumber.markAsTouched();
            this.paymentForm.controls.cardExpirationMonth.markAsTouched();
            this.paymentForm.controls.cardExpirationYear.markAsTouched();
            this.paymentForm.controls.securityCode.markAsTouched();
            this.paymentForm.controls.holderName.markAsTouched();
            setTimeout(() => {
                const element: HTMLElement = this.elementRef.nativeElement;
                const validation = <HTMLElement>element.querySelector('.validation');
                if (validation === null) {
                    return;
                }
                const rect = validation.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const top = rect.top + scrollTop - 50;
                window.scrollTo(undefined, top);
            }, 0);

            return;
        }
        this.disable = true;
        this.isLoading = true;

        try {
            await this.sasaki.getServices();
            // GMOトークン取得
            const gmoTokenObject = await this.user.getGmoObject({
                cardno: this.paymentForm.controls.cardNumber.value,
                expire: this.paymentForm.controls.cardExpirationYear.value + this.paymentForm.controls.cardExpirationMonth.value,
                securitycode: this.paymentForm.controls.securityCode.value,
                holdername: this.paymentForm.controls.holderName.value
            });

            // 会員 クレジットカード情報保存
            await this.user.registerCreditCard(gmoTokenObject);
        } catch (err) {
            console.error(err);
            // クレジットカード処理失敗
            this.isLoading = false;
            this.creditCardAlertModal = true;
            this.paymentForm.controls.cardNumber.setValue('');
            this.paymentForm.controls.securityCode.setValue('');
            this.paymentForm.controls.holderName.setValue('');
            this.disable = false;

            return;
        }

        try {
            // 販売劇場検索 TODO
            const theaterCode = '101';
            const seller = await this.sasaki.organization.findMovieTheaterByBranchCode({
                branchCode: theaterCode
            });
            if (seller === null) {
                throw new Error('販売劇場が見つかりませんでした。');
            }

            const programMembership = this.programMemberships[0];

            if (programMembership.id === undefined
                || programMembership.offers === undefined
            ) {
                throw new Error('programMemberships is Injustice');
            }

            const offer = programMembership.offers[0];

            if (offer.identifier === undefined) {
                throw new Error('programMemberships is Injustice');
            }

            // 会員プログラム登録
            await this.sasaki.person.registerProgramMembership({
                personId: 'me',
                programMembershipId: programMembership.id,
                offerIdentifier: offer.identifier,
                sellerType: seller.typeOf,
                sellerId: seller.id
            });
            const time = 5000;
            const limit = 20;
            let count = 0;
            const timer = setInterval(async () => {
                const programMembershipOwnershipInfos = await this.sasaki.person.searchOwnershipInfos({
                    ownedBy: 'me',
                    goodType: 'ProgramMembership'
                });
                if (programMembershipOwnershipInfos.length > 0) {
                    clearInterval(timer);
                    this.router.navigate(['/']);
                } else if (count > limit) {
                    clearInterval(timer);
                    this.router.navigate(['/auth/select']);
                }
                count++;
            }, time);
        } catch (err) {
            console.error(err);
            // 会員プログラム登録失敗
            this.isLoading = false;
            this.registerProgramMembershipAlertModal = true;
            this.disable = false;
        }
    }

    /**
     * サインアウト
     */
    public async signOut() {
        await this.sasaki.getServices();
        await this.sasaki.signOut();
    }

}
