import { Component, Inject, forwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


@Component({
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
                    <input type="password" [formControl]="loginForm.controls['password']" placeholder="">
                    <div *ngIf="submitFlag && password.hasError('required')" class="validation">パスワードが未入力です</div>
                </dd>
            </dl>
            <button class="blue-button button" type="submit">ログイン</button>
        </form>
    </div>
    `
})
export class AuthLoginComponent {
    public loginForm: FormGroup;
    public mail: AbstractControl;
    public password: AbstractControl;
    public submitFlag: boolean;

    constructor(private formBuilder: FormBuilder, private router: Router) {
        this.submitFlag = false;
        this.loginForm = formBuilder.group(this.getValidation());

        this.mail = this.loginForm.controls['mail'];
        this.password = this.loginForm.controls['password'];
    }

    /**
     * ログイン
     */
    public onSubmit(value: string): void {
        this.submitFlag = true;
        if (this.loginForm.valid) {
            let storage: Storage = sessionStorage;
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
    private getValidation(): any {
        let result = {
            mail: ['', Validators.compose([
                Validators.required,
                Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
            ])],
            password: ['', Validators.compose([
                Validators.required
            ])]
        };

        return result;
    }

}

