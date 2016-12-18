"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const router_1 = require('@angular/router');
const forms_1 = require('@angular/forms');
let RegistInputComponent = class RegistInputComponent {
    constructor(formBuilder, router) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.submitFlag = false;
        this.formGroup = formBuilder.group(this.getFormControls());
        this.settingForms();
        this.years = this.getYears();
        this.months = this.getMonths();
    }
    /**
     * 確認
     */
    onSubmit(value) {
        this.submitFlag = true;
        //動的なバリデーションがあるものは更新
        this.creditNo.updateValueAndValidity();
        this.holderName.updateValueAndValidity();
        this.securityCode.updateValueAndValidity();
        //バリデーションチェック
        if (this.formGroup.valid) {
            let user = {
                lastName: this.lastName.value,
                firstName: this.firstName.value,
                mail: this.mail.value,
                tel: this.tel.value,
                password: this.password.value,
                credit: this.credit.value,
                creditNo: this.creditNo.value,
                holderName: this.holderName.value,
                expireYear: this.expireYear.value,
                expireMonth: this.expireMonth.value,
                securityCode: this.securityCode.value,
            };
            sessionStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['regist/confirm']);
        }
    }
    /**
     * バリデーション
     */
    getFormControls() {
        let user = JSON.parse(sessionStorage.getItem('user'));
        let defaultValues = {
            lastName: (user) ? user.lastName : '',
            firstName: (user) ? user.firstName : '',
            mail: (user) ? user.mail : '',
            tel: (user) ? user.tel : '',
            password: (user) ? user.password : ''
        };
        let result = {
            lastName: [defaultValues.lastName, forms_1.Validators.compose([
                    forms_1.Validators.required,
                    forms_1.Validators.pattern(/^[ァ-ン]+$/)
                ])],
            firstName: [defaultValues.firstName, forms_1.Validators.compose([
                    forms_1.Validators.required,
                    forms_1.Validators.pattern(/^[ァ-ン]+$/)
                ])],
            mail: [defaultValues.mail, forms_1.Validators.compose([
                    forms_1.Validators.required,
                    forms_1.Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
                ])],
            tel: [defaultValues.tel, forms_1.Validators.compose([
                    forms_1.Validators.required,
                    forms_1.Validators.pattern(/^[0-9]+$/)
                ])],
            password: [defaultValues.password, forms_1.Validators.compose([
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(8),
                    forms_1.Validators.maxLength(8)
                ])],
            credit: ['', forms_1.Validators.compose([])],
            creditNo: ['', forms_1.Validators.compose([
                        (control) => {
                        if (this.credit && this.credit.value && control.value === '') {
                            return { creditRequired: true };
                        }
                        return null;
                    },
                    forms_1.Validators.maxLength(16),
                    forms_1.Validators.pattern(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[0-9]{15})$/)
                ])],
            holderName: ['', forms_1.Validators.compose([
                        (control) => {
                        if (this.credit && this.credit.value && control.value === '') {
                            return { creditRequired: true };
                        }
                        return null;
                    },
                    forms_1.Validators.pattern(/^[A-Z]+[\s|　]+[A-Z]+[\s|　]*[A-Z]+$/)
                ])],
            expireYear: ['', forms_1.Validators.compose([])],
            expireMonth: ['', forms_1.Validators.compose([])],
            securityCode: ['', forms_1.Validators.compose([
                        (control) => {
                        if (this.credit && this.credit.value && control.value === '') {
                            return { creditRequired: true };
                        }
                        return null;
                    },
                    forms_1.Validators.pattern(/^[0-9]{3,4}$/)
                ])]
        };
        return result;
    }
    /**
     * フォームセッティング
     */
    settingForms() {
        this.lastName = this.formGroup.controls['lastName'];
        this.firstName = this.formGroup.controls['firstName'];
        this.mail = this.formGroup.controls['mail'];
        this.tel = this.formGroup.controls['tel'];
        this.password = this.formGroup.controls['password'];
        this.credit = this.formGroup.controls['credit'];
        this.creditNo = this.formGroup.controls['creditNo'];
        this.holderName = this.formGroup.controls['holderName'];
        this.expireYear = this.formGroup.controls['expireYear'];
        this.expireMonth = this.formGroup.controls['expireMonth'];
        this.securityCode = this.formGroup.controls['securityCode'];
    }
    /**
     * 年取得
     */
    getYears() {
        let result = [];
        let nowDate = new Date();
        let year = nowDate.getFullYear();
        for (let i = 0; i < 10; i++) {
            result.push(String(year + i));
        }
        return result;
    }
    /**
     * 月取得
     */
    getMonths() {
        let result = [];
        for (let i = 0; i < 12; i++) {
            result.push(String(i + 1));
        }
        return result;
    }
};
RegistInputComponent = __decorate([
    core_1.Component({
        selector: 'regist-input',
        template: `
    <header pageName="新規会員登録"></header>
    <div class="contents">
        <p class="read">
            お客様情報をご入力ください。
        </p>
        <form class="form" [formGroup]="formGroup" (ngSubmit)="onSubmit(formGroup.value)">
            <dl>
                <dt>お名前（セイ）</dt>
                <dd>
                    <input type="text" [formControl]="formGroup.controls['lastName']" placeholder="">
                    <div *ngIf="submitFlag && lastName.hasError('required')" class="validation">お名前（セイ）が未入力です</div>
                    <div *ngIf="submitFlag && lastName.hasError('pattern')" class="validation">お名前（セイ）の形式が違います</div>
                </dd>
            </dl>
            <dl>
                <dt>お名前（メイ）</dt>
                <dd>
                    <input type="text" [formControl]="formGroup.controls['firstName']" placeholder="">
                    <div *ngIf="submitFlag && firstName.hasError('required')" class="validation">お名前（メイ）が未入力です</div>
                    <div *ngIf="submitFlag && firstName.hasError('pattern')" class="validation">お名前（メイ）の形式が違います</div>
                </dd>
            </dl>
            <dl>
                <dt>メールアドレス</dt>
                <dd>
                    <input type="text" [formControl]="formGroup.controls['mail']" placeholder="(例)cinema@cinemasunshine.jp">
                    <div *ngIf="submitFlag && mail.hasError('required')" class="validation">メールアドレスが未入力です</div>
                    <div *ngIf="submitFlag && mail.hasError('pattern')" class="validation">メールアドレスの形式が違います</div>
                </dd>
            </dl>
            <dl>
                <dt>電話番号</dt>
                <dd>
                    <input type="text" [formControl]="formGroup.controls['tel']" placeholder="">
                    <div *ngIf="submitFlag && tel.hasError('required')" class="validation">電話番号が未入力です</div>
                    <div *ngIf="submitFlag && tel.hasError('pattern')" class="validation">電話番号の形式が違います</div>
                </dd>
            </dl>
            <dl>
                <dt>パスワード</dt>
                <dd>
                    <input type="password" [formControl]="formGroup.controls['password']" placeholder="">
                    <div *ngIf="submitFlag && password.hasError('required')" class="validation">パスワードが未入力です</div>
                    <div *ngIf="submitFlag && (password.hasError('minlength') || password.hasError('maxlength'))" class="validation">パスワードは8桁です</div>
                </dd>
            </dl>
            <dl>
                <dt>クレジットカード情報</dt>
                <dd>
                    <input type="checkbox" [formControl]="formGroup.controls['credit']">
                </dd>
            </dl>
            <div *ngIf="credit.value">
                <dl>
                    <dt>カード番号</dt>
                    <dd>
                        <input type="text" [formControl]="formGroup.controls['creditNo']" placeholder="">
                        <div *ngIf="submitFlag && creditNo.hasError('creditRequired')" class="validation">カード番号が未入力です</div>
                        <div *ngIf="submitFlag && creditNo.hasError('maxLength')" class="validation">カード番号は16桁以下です</div>
                        <div *ngIf="submitFlag && creditNo.hasError('pattern')" class="validation">カード番号の形式が違います</div>
                    </dd>
                </dl>
                <dl>
                    <dt>名義人</dt>
                    <dd>
                        <input type="text" [formControl]="formGroup.controls['holderName']" placeholder="">
                        <div *ngIf="submitFlag && holderName.hasError('creditRequired')" class="validation">名義人が未入力です</div>
                        <div *ngIf="submitFlag && holderName.hasError('pattern')" class="validation">名義人の形式が違います</div>
                    </dd>
                </dl>
                <dl>
                    <dt>有効期限</dt>
                    <dd>
                        <select [formControl]="formGroup.controls['expireYear']">
                            <option *ngFor="let i of years">{{i}}</option>
                        </select> 年 
                        <select [formControl]="formGroup.controls['expireMonth']">
                            <option *ngFor="let i of months">{{i}}</option>
                        </select> 月 
                    </dd>
                </dl>
                <dl>
                    <dt>セキュリティーコード</dt>
                    <dd>
                        <input type="text" [formControl]="formGroup.controls['securityCode']" placeholder="">
                        <div *ngIf="submitFlag && securityCode.hasError('creditRequired')" class="validation">セキュリティーコードが未入力です</div>
                        <div *ngIf="submitFlag && securityCode.hasError('pattern')" class="validation">セキュリティーコードの形式が違います</div>
                    </dd>
                </dl>
            </div>
            <div class="button-area">
                <button class="blue-button button" type="submit">入力内容を確認</button>
                <div class="blue-button button" routerLink="/auth">戻る</div>
            </div>
            
        </form>
    </div>
    `
    }), 
    __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router])
], RegistInputComponent);
exports.RegistInputComponent = RegistInputComponent;
