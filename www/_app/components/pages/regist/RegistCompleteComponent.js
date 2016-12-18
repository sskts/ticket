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
let RegistCompleteComponent = class RegistCompleteComponent {
    constructor(router) {
        this.router = router;
    }
};
RegistCompleteComponent = __decorate([
    core_1.Component({
        selector: 'regist-complete',
        template: `
    <header pageName="新規会員登録"></header>
    <div class="contents">
        <p class="read">
            会員登録が完了しました。<br>
            ご登録ありがとうございます。<br>
            引き続きシネマサンシャインアプリをお楽しみください。
        </p>
        <div class="blue-button button" routerLink="/">アプリTOPへ</div>
    </div>
    `
    }), 
    __metadata('design:paramtypes', [router_1.Router])
], RegistCompleteComponent);
exports.RegistCompleteComponent = RegistCompleteComponent;
