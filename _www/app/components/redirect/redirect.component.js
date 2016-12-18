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
let RedirectComponent = class RedirectComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
        //ログインチェック
        if (this.isAuth()) {
            //topへ
            this.router.navigate(['/index']);
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
};
RedirectComponent = __decorate([
    core_1.Component({
        selector: 'app-redirect',
        templateUrl: 'app/components/redirect/redirect.component.html',
        styleUrls: ['app/components/redirect/redirect.component.scss']
    }), 
    __metadata('design:paramtypes', [router_1.Router])
], RedirectComponent);
exports.RedirectComponent = RedirectComponent;
