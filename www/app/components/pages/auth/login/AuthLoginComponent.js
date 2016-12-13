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
let AuthLoginComponent = class AuthLoginComponent {
    constructor(formBuilder, router) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.submitFlag = false;
        this.loginForm = formBuilder.group(this.getValidation());
        this.mail = this.loginForm.controls['mail'];
        this.password = this.loginForm.controls['password'];
    }
    /**
     * ログイン
     */
    onSubmit(value) {
        this.submitFlag = true;
        if (this.loginForm.valid) {
            let storage = sessionStorage;
            let user = {};
            storage.setItem('user', user);
            this.router.navigate(['/index']);
        }
    }
    /**
     * バリデーション
     */
    getValidation() {
        let result = {
            mail: ['', forms_1.Validators.compose([
                    forms_1.Validators.required,
                    forms_1.Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
                ])],
            password: ['', forms_1.Validators.compose([
                    forms_1.Validators.required
                ])]
        };
        return result;
    }
};
AuthLoginComponent = __decorate([
    core_1.Component({
        selector: 'auth-login',
        template: `
    <div class="contents auth">
        <div class="logo"><img src="/images/logo.jpg"></div>
        <div class="page-ttl">ログイン</div>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit(loginForm.value)">
            <dl>
                <dt>メールアドレス</dt>
                <dd>
                    <input type="text" [formControl]="loginForm.controls['mail']" placeholder="(例)cinema@cinemasunshine.jp">
                    <div *ngIf="submitFlag && mail.hasError('required')" class="validation">メールアドレスが未入力です</div>
                    <div *ngIf="submitFlag && mail.hasError('pattern')" class="validation">メールアドレスの形式が違います</div>
                </dd>
            </dl>
            <dl>
                <dt>パスワード</dt>
                <dd>
                    <input type="text" [formControl]="loginForm.controls['password']" placeholder="">
                    <div *ngIf="submitFlag && password.hasError('required')" class="validation">パスワードが未入力です</div>
                </dd>
            </dl>
            <button class="blue-button button" type="submit">ログイン</button>
        </form>
    </div>
    `
    }), 
    __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router])
], AuthLoginComponent);
exports.AuthLoginComponent = AuthLoginComponent;
