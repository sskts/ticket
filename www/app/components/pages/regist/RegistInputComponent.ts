import { Component, Inject, forwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


@Component({
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
})
export class RegistInputComponent {
    public inputForm: FormGroup;
    public mail: AbstractControl;
    public password: AbstractControl;
    public submitFlag: boolean;

    constructor(private formBuilder: FormBuilder, private router: Router) {
        this.submitFlag = false;
        this.inputForm = formBuilder.group(this.getValidation());

        this.mail = this.inputForm.controls['mail'];
        this.password = this.inputForm.controls['password'];
    }

    /**
     * 登録
     */
    public onSubmit(value: string): void {
        this.submitFlag = true;
        if (this.inputForm.valid) {
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


