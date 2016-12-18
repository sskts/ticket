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
let RegistPasswordComponent = class RegistPasswordComponent {
    constructor(formBuilder, router) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.submitFlag = false;
        this.formGroup = formBuilder.group(this.getFormControls());
        this.settingForms();
    }
    /**
     * 会員登録をする
     */
    onSubmit(value) {
        this.submitFlag = true;
        console.log(this);
        //バリデーションチェック
        if (this.formGroup.valid) {
            let password = this.password.value;
            localStorage.setItem('user', sessionStorage.getItem('user'));
            this.router.navigate(['regist/complete']);
        }
    }
    /**
     * バリデーション
     */
    getFormControls() {
        let result = {
            password: ['', forms_1.Validators.compose([
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(8),
                    forms_1.Validators.maxLength(8)
                ])]
        };
        return result;
    }
    /**
     * フォームセッティング
     */
    settingForms() {
        this.password = this.formGroup.controls['password'];
    }
};
RegistPasswordComponent = __decorate([
    core_1.Component({
        selector: 'regist-input',
        template: `
    <header pageName="新規会員登録"></header>
    <div class="contents">
        <p class="read">
            ご入力頂いたメールアドレス宛にワンタイムパスワードを送っております。<br>
            ご入力頂き「会員登録」をするボタンを押してください。
        </p>
        <form class="form" [formGroup]="formGroup" (ngSubmit)="onSubmit(formGroup.value)">
            <dl>
                <dt>パスワード</dt>
                <dd>
                    <input type="password" [formControl]="formGroup.controls['password']" placeholder="">
                    <div *ngIf="submitFlag && password.hasError('required')" class="validation">パスワードが未入力です</div>
                    <div *ngIf="submitFlag && (password.hasError('minlength') || password.hasError('maxlength'))" class="validation">パスワードは8桁です</div>
                    <a routerLink="/regist/password">パスワードを忘れた方はこちら</a>
                </dd>
            </dl>
            <button class="blue-button button" type="submit">会員登録をする</button>
        </form>
    </div>
    `
    }), 
    __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router])
], RegistPasswordComponent);
exports.RegistPasswordComponent = RegistPasswordComponent;
