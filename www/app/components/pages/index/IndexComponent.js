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
let IndexComponent = class IndexComponent {
    constructor(router) {
        this.router = router;
    }
    /**
     * 初期化
     */
    ngOnInit() {
        //ログインチェック
        if (this.isAuth()) {
        }
        else {
            //認証画面へ
            this.router.navigate(['/auth']);
        }
    }
    /**
     * ログインチェック
     */
    isAuth() {
        let result = false;
        if (localStorage.getItem('user')) {
            result = true;
        }
        return result;
    }
    /**
     * Storage初期化
     */
    initStorage() {
        localStorage.removeItem('user');
        this.ngOnInit();
    }
};
IndexComponent = __decorate([
    core_1.Component({
        selector: 'index',
        template: `
        <header pageName="TOP"></header>
        <div class="contents">
            <div class="button blue-button" (click)="initStorage()">ストレージ初期化</div>
        </div>
        <navigation activeNo="0"></navigation>
    `
    }), 
    __metadata('design:paramtypes', [router_1.Router])
], IndexComponent);
exports.IndexComponent = IndexComponent;
