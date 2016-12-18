import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


@Component({
    selector: 'auth-login',
    template: `
    <div class="contents auth">
        <div class="logo"><img src="images/logo.jpg"></div>
        <div class="page-ttl">ログイン</div>
        <form class="form" [formGroup]="formGroup" (ngSubmit)="onSubmit(formGroup.value)">
            <dl>
                <dt>メールアドレス</dt>
                <dd>
                    <input type="text" [formControl]="formGroup.controls['mail']" placeholder="(例)cinema@cinemasunshine.jp">
                    <div *ngIf="submitFlag && mail.hasError('required')" class="validation">メールアドレスが未入力です</div>
                    <div *ngIf="submitFlag && mail.hasError('pattern')" class="validation">メールアドレスの形式が違います</div>
                </dd>
            </dl>
            <dl>
                <dt>パスワード</dt>
                <dd>
                    <input type="password" [formControl]="formGroup.controls['password']" placeholder="">
                    <div *ngIf="submitFlag && password.hasError('required')" class="validation">パスワードが未入力です</div>
                </dd>
            </dl>
            <div class="button-area">
                <button class="blue-button button" type="submit">ログイン</button>
                <div class="blue-button button" routerLink="/auth">戻る</div>
            </div>
        </form>
    </div>
    `
})
export class AuthLoginComponent {
    public formGroup: FormGroup;
    public mail: AbstractControl;
    public password: AbstractControl;
    public submitFlag: boolean;

    constructor(private formBuilder: FormBuilder, private router: Router) {
        this.submitFlag = false;
        this.formGroup = formBuilder.group(this.getFormControls());
        this.settingForms();
        
    }

    /**
     * ログイン
     */
    public onSubmit(value: string): void {
        this.submitFlag = true;
        if (this.formGroup.valid) {
            this.router.navigate(['']);
        }
    }

    /**
     * バリデーション
     */
    private getFormControls(): any {
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

    /**
     * フォームセッティング
     */
    private settingForms(): void {
        this.mail = this.formGroup.controls['mail'];
        this.password = this.formGroup.controls['password'];
    }


}

