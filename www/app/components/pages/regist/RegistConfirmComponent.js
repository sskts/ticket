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
let RegistConfirmComponent = class RegistConfirmComponent {
    constructor(formBuilder, router) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.formGroup = formBuilder.group({});
        this.user = JSON.parse(sessionStorage.getItem('user'));
    }
    /**
     * ワンタイムパスワード発行
     */
    onSubmit(value) {
        this.router.navigate(['regist/password']);
    }
};
RegistConfirmComponent = __decorate([
    core_1.Component({
        selector: 'regist-confirm',
        template: `
    <header pageName="新規会員登録"></header>
    <div class="contents">
        <p class="read">
            お客様情報をご確認ください。<br>
            問題ないようでしたら「ワンタイムパスワードを発行する」ボタンを押してください。<br>
            その後ご登録頂いたメールアドレス宛にワンタイムパスワードを発行しますので次のページでそちらを登録してください。
        </p>
        <form class="form" [formGroup]="formGroup" (ngSubmit)="onSubmit(formGroup.value)">
            <dl>
                <dt>お名前（セイ）</dt>
                <dd>{{user.lastName}}</dd>
            </dl>
            <dl>
                <dt>お名前（メイ）</dt>
                <dd>{{user.firstName}}</dd>
            </dl>
            <dl>
                <dt>メールアドレス</dt>
                <dd>{{user.mail}}</dd>
            </dl>
            <dl>
                <dt>電話番号</dt>
                <dd>{{user.tel}}</dd>
            </dl>
            <dl>
                <dt>パスワード</dt>
                <dd>{{user.password}}</dd>
            </dl>
            <div *ngIf="user.credit">
                <dl>
                    <dt>クレジットカード情報</dt>
                </dl>
                <dl>
                    <dt>カード番号</dt>
                    <dd>{{user.creditNo}}</dd>
                </dl>
                <dl>
                    <dt>名義人</dt>
                    <dd>{{user.holderName}}</dd>
                </dl>
            </div>
            
            <div class="button-area">
                <button class="blue-button button" type="submit">ワンタイムパスワード発行</button>
                <div class="blue-button button" routerLink="/regist/input">戻る</div>
            </div>
        </form>
    </div>
    `
    }), 
    __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router])
], RegistConfirmComponent);
exports.RegistConfirmComponent = RegistConfirmComponent;
