import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BsModalService } from 'ngx-bootstrap';
import { UserService, UtilService } from '../../../../../services';
import {
    CreditcardSecurityCodeModalComponent
} from '../../../../shared/components/parts/security-code-modal/security-code-modal.component';

@Component({
    selector: 'app-member-edit-credit',
    templateUrl: './member-edit-credit.component.html',
    styleUrls: ['./member-edit-credit.component.scss']
})
export class MemberEditCreditComponent implements OnInit {

    public cardExpiration: {
        year: string[];
        month: string[];
    };
    public creditForm: FormGroup;
    public isLoading: boolean;

    constructor(
        private modal: BsModalService,
        private router: Router,
        private elementRef: ElementRef,
        private formBuilder: FormBuilder,
        private user: UserService,
        private utilService: UtilService
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
        this.isLoading = false;
        this.cardExpiration = {
            year: [],
            month: []
        };
        this.creditForm = this.createForm();
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
        this.isLoading = true;
        Object.keys(this.creditForm.controls).forEach((key) => {
            this.creditForm.controls[key].markAsTouched();
            this.creditForm.controls[key].setValue((<HTMLInputElement>document.getElementById(key)).value);
        });
        if (this.creditForm.invalid) {
            // フォームのステータス変更
            setTimeout(() => {
                const element: HTMLElement = this.elementRef.nativeElement;
                const validation = <HTMLElement>element.querySelector('.validation');
                if (validation === null) {
                    return;
                }
                const rect = validation.getBoundingClientRect();
                const contents = (<HTMLElement>element.querySelector('app-page .scroll'));
                const scrollTop = contents.scrollTop;
                const top = rect.top + scrollTop - 80;
                contents.scrollTo(0, top);
            }, 0);
            this.isLoading = false;
            return;
        }

        try {
            // GMOトークン取得
            const gmoTokenObject = await this.user.getGmoObject({
                cardno: this.creditForm.controls.cardNumber.value,
                expire: this.creditForm.controls.cardExpirationYear.value + this.creditForm.controls.cardExpirationMonth.value,
                securitycode: this.creditForm.controls.securityCode.value,
                holdername: this.creditForm.controls.holderName.value
            });

            // 会員 クレジットカード情報保存
            await this.user.registerCreditCard(gmoTokenObject);
            this.router.navigate(['/member/edit']);
        } catch (err) {
            console.error(err);
            // クレジットカード処理失敗
            this.isLoading = false;
            this.creditForm.controls.cardNumber.setValue('');
            this.creditForm.controls.securityCode.setValue('');
            this.creditForm.controls.holderName.setValue('');
            this.utilService.openAlert({
                title: 'エラーが発生しました',
                body: '入力内容をご確認ください。'
            });
        }
    }

    /**
     * セキュリティコード詳細表示
     */
    public openSecurityCode(event: Event) {
        event.preventDefault();
        this.modal.show(CreditcardSecurityCodeModalComponent, {
            class: 'modal-dialog-centered'
        });
    }

}
