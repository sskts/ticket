import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { factory } from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';
import { MemberService } from '../../../services/member/member.service';
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
        private sasaki: SasakiService,
        private member: MemberService
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     */
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
            // 会員プログラム取得
            this.programMemberships = await this.member.getProgramMemberships();

            if (this.programMemberships.length === 0) {
                throw new Error('programMemberships is not found');
            }
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
            const programMembership = this.programMemberships[0];
            // 会員登録
            await this.member.register({
                theaterCode: theaterCode,
                programMembership: programMembership
            });

            // 会員登録確認
            const isRegister = await this.member.isRegister();
            if (!isRegister) {
                this.router.navigate(['/error', { redirect: '/auth/select' }]);

                return;
            }

            this.router.navigate(['/']);
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
     * @method signOut
     */
    public async signOut() {
        await this.sasaki.getServices();
        await this.sasaki.signOut();
    }

}
