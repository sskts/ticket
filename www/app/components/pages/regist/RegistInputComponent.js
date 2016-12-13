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
        this.inputForm = formBuilder.group(this.getValidation());
        this.mail = this.inputForm.controls['mail'];
        this.password = this.inputForm.controls['password'];
    }
    /**
     * 登録
     */
    onSubmit(value) {
        this.submitFlag = true;
        if (this.inputForm.valid) {
            let storage = sessionStorage;
            let user = {
                name: '畑口 晃人',
                mail: this.mail.value
            };
            storage.setItem('user', JSON.stringify(user));
            this.router.navigate(['']);
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
RegistInputComponent = __decorate([
    core_1.Component({
        selector: 'regist-input',
        template: `
    <header></header>
    <div class="contents regist-input">
        <div class="page-ttl">会員登録</div>
        <form [formGroup]="inputForm" (ngSubmit)="onSubmit(inputForm.value)">
            <dl>
                <dt>メールアドレス</dt>
                <dd>
                    <input type="text" [formControl]="inputForm.controls['mail']" placeholder="(例)cinema@cinemasunshine.jp">
                    <div *ngIf="submitFlag && mail.hasError('required')" class="validation">メールアドレスが未入力です</div>
                    <div *ngIf="submitFlag && mail.hasError('pattern')" class="validation">メールアドレスの形式が違います</div>
                </dd>
            </dl>
            <dl>
                <dt>メールアドレス</dt>
                <dd>
                    <input type="text" [formControl]="inputForm.controls['mail']" placeholder="(例)cinema@cinemasunshine.jp">
                    <div *ngIf="submitFlag && mail.hasError('required')" class="validation">メールアドレスが未入力です</div>
                    <div *ngIf="submitFlag && mail.hasError('pattern')" class="validation">メールアドレスの形式が違います</div>
                </dd>
            </dl>
            <dl>
                <dt>メールアドレス</dt>
                <dd>
                    <input type="text" [formControl]="inputForm.controls['mail']" placeholder="(例)cinema@cinemasunshine.jp">
                    <div *ngIf="submitFlag && mail.hasError('required')" class="validation">メールアドレスが未入力です</div>
                    <div *ngIf="submitFlag && mail.hasError('pattern')" class="validation">メールアドレスの形式が違います</div>
                </dd>
            </dl>
            <dl>
                <dt>メールアドレス</dt>
                <dd>
                    <input type="text" [formControl]="inputForm.controls['mail']" placeholder="(例)cinema@cinemasunshine.jp">
                    <div *ngIf="submitFlag && mail.hasError('required')" class="validation">メールアドレスが未入力です</div>
                    <div *ngIf="submitFlag && mail.hasError('pattern')" class="validation">メールアドレスの形式が違います</div>
                </dd>
            </dl>
            <dl>
                <dt>メールアドレス</dt>
                <dd>
                    <input type="text" [formControl]="inputForm.controls['mail']" placeholder="(例)cinema@cinemasunshine.jp">
                    <div *ngIf="submitFlag && mail.hasError('required')" class="validation">メールアドレスが未入力です</div>
                    <div *ngIf="submitFlag && mail.hasError('pattern')" class="validation">メールアドレスの形式が違います</div>
                </dd>
            </dl>
            <dl>
                <dt>メールアドレス</dt>
                <dd>
                    <input type="text" [formControl]="inputForm.controls['mail']" placeholder="(例)cinema@cinemasunshine.jp">
                    <div *ngIf="submitFlag && mail.hasError('required')" class="validation">メールアドレスが未入力です</div>
                    <div *ngIf="submitFlag && mail.hasError('pattern')" class="validation">メールアドレスの形式が違います</div>
                </dd>
            </dl>
            <dl>
                <dt>メールアドレス</dt>
                <dd>
                    <input type="text" [formControl]="inputForm.controls['mail']" placeholder="(例)cinema@cinemasunshine.jp">
                    <div *ngIf="submitFlag && mail.hasError('required')" class="validation">メールアドレスが未入力です</div>
                    <div *ngIf="submitFlag && mail.hasError('pattern')" class="validation">メールアドレスの形式が違います</div>
                </dd>
            </dl>
            <button class="blue-button button" type="submit">登録</button>
        </form>
    </div>
    `
    }), 
    __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router])
], RegistInputComponent);
exports.RegistInputComponent = RegistInputComponent;
