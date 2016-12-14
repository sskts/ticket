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
let AuthComponent = class AuthComponent {
};
AuthComponent = __decorate([
    core_1.Component({
        selector: 'auth',
        template: `
    <div class="contents auth">
        <div class="logo"><img src="images/logo.jpg"></div>
        <div class="page-ttl">新規会員登録 / ログイン</div>
        <div class="form">
            <dl>
                <dt>初めて会員登録をする方は下のボタンよりご登録ください</dt>
                <dd>
                    <div class="blue-button button" routerLink="/regist/input">会員登録する</div>
                </dd>
            </dl>
            <dl>
                <dt>既に会員登録済みの方は下のボタンよりログインしてください</dt>
                <dd>
                    <div class="blue-button button" routerLink="/auth/login">ログインする</div>
                    <a routerLink="/regist/password">パスワードを忘れた方はこちら</a>
                </dd>
            </dl>
        </div>
    </div>
    `
    }), 
    __metadata('design:paramtypes', [])
], AuthComponent);
exports.AuthComponent = AuthComponent;
