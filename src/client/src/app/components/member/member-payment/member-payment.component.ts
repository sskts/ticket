import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SasakiService } from '../../../services/sasaki/sasaki.service';

@Component({
    selector: 'app-member-payment',
    templateUrl: './member-payment.component.html',
    styleUrls: ['./member-payment.component.scss']
})
export class MemberPaymentComponent implements OnInit {

    public cardExpiration: {
        year: string[];
        month: string[];
    };
    public paymentForm: FormGroup;
    public isLoading: boolean;
    public securityCodeModal: boolean;
    public creditCardAlertModal: boolean;
    public disable: boolean;

    constructor(
        private router: Router,
        private elementRef: ElementRef,
        private formBuilder: FormBuilder,
        private sasaki: SasakiService
    ) { }

    public ngOnInit() {
        window.scrollTo(0, 0);
        this.isLoading = false;
        this.cardExpiration = {
            year: [],
            month: []
        };
        this.paymentForm = this.createForm();
        this.disable = false;
    }

    /**
     * フォーム作成
     * @method createForm
     */
    private createForm() {
        const customerContact = {
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
            cardNumber: [customerContact.cardNumber.value, customerContact.cardNumber.validators],
            cardExpirationMonth: [customerContact.cardExpirationMonth.value, customerContact.cardExpirationMonth.validators],
            cardExpirationYear: [customerContact.cardExpirationYear.value, customerContact.cardExpirationYear.validators],
            securityCode: [customerContact.securityCode.value, customerContact.securityCode.validators],
            holderName: [customerContact.holderName.value, customerContact.holderName.validators],
            saveCreditCard: [false]
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
            const gmoTokenObject = await this.getGmoObject();
            // クレジットカード処理

            if (this.paymentForm.controls.saveCreditCard.value) {
                // 会員 クレジットカード情報保存
                await this.sasaki.getServices();
                const addCreditCardArgs = {
                    personId: 'me',
                    creditCard: {
                        token: gmoTokenObject.token
                    }
                };
                await this.sasaki.person.addCreditCard(addCreditCardArgs);
            }
            this.router.navigate(['/']);
        } catch (err) {
            console.error(err);
            // クレジットカード処理失敗
            this.isLoading = false;
            this.creditCardAlertModal = true;
            this.paymentForm.controls.cardNumber.setValue('');
            this.paymentForm.controls.securityCode.setValue('');
            this.paymentForm.controls.holderName.setValue('');
            this.disable = false;
        }
    }

    private async getGmoObject() {
        return {
            token: ''
        };
    }

}

export interface IGmoTokenObject {
    token: string;
    toBeExpiredAt: string;
    maskedCardNo: string;
    isSecurityCodeSet: boolean;
}
