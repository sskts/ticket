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
        this.formGroup = formBuilder.group(this.getFormControls());
    }
    ngOnInit() {
        this.submitFlag = false;
        this.settingForms();
    }
    /**
     * ログイン
     */
    onSubmit(value) {
        this.submitFlag = true;
        if (this.formGroup.valid) {
            this.router.navigate(['']);
        }
    }
    /**
     * バリデーション
     */
    getFormControls() {
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
    /**
     * フォームセッティング
     */
    settingForms() {
        this.mail = this.formGroup.controls['mail'];
        this.password = this.formGroup.controls['password'];
    }
};
AuthLoginComponent = __decorate([
    core_1.Component({
        selector: 'app-auth-login',
        templateUrl: 'app/components/auth-login/auth-login.component.html',
        styleUrls: ['app/components/auth-login/auth-login.component.scss']
    }), 
    __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router])
], AuthLoginComponent);
exports.AuthLoginComponent = AuthLoginComponent;
