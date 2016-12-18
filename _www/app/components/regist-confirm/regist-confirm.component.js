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
    ngOnInit() {
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
        selector: 'app-regist-confirm',
        templateUrl: 'app/components/regist-confirm/regist-confirm.component.html',
        styleUrls: ['app/components/regist-confirm/regist-confirm.component.scss']
    }), 
    __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router])
], RegistConfirmComponent);
exports.RegistConfirmComponent = RegistConfirmComponent;
