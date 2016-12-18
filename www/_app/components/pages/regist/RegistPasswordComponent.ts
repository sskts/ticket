import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


@Component({
    selector: 'regist-input',
    template: `
    <header pageName="新規会員登録"></header>
    <div class="contents">
        <p class="read">
            ご入力頂いたメールアドレス宛にワンタイムパスワードを送っております。<br>
            ご入力頂き「会員登録」をするボタンを押してください。
        </p>
        <form class="form" [formGroup]="formGroup" (ngSubmit)="onSubmit(formGroup.value)">
            <dl>
                <dt>パスワード</dt>
                <dd>
                    <input type="password" [formControl]="formGroup.controls['password']" placeholder="">
                    <div *ngIf="submitFlag && password.hasError('required')" class="validation">パスワードが未入力です</div>
                    <div *ngIf="submitFlag && (password.hasError('minlength') || password.hasError('maxlength'))" class="validation">パスワードは8桁です</div>
                    <a routerLink="/regist/password">パスワードを忘れた方はこちら</a>
                </dd>
            </dl>
            <button class="blue-button button" type="submit">会員登録をする</button>
        </form>
    </div>
    `
})
export class RegistPasswordComponent {
    public formGroup: FormGroup;
    public password: AbstractControl;
    public submitFlag: boolean;

    constructor(private formBuilder: FormBuilder, private router: Router) {
        this.submitFlag = false;
        this.formGroup = formBuilder.group(this.getFormControls());
        this.settingForms();
    }

    /**
     * 会員登録をする
     */
    public onSubmit(value: string): void {
        this.submitFlag = true;
        console.log(this)
        //バリデーションチェック
        if (this.formGroup.valid) {
            let password = this.password.value;
            
            localStorage.setItem('user', sessionStorage.getItem('user'));
            this.router.navigate(['regist/complete']);
        }
    }

    /**
     * バリデーション
     */
    private getFormControls(): any {
        let result = {
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(8)
            ])]
        };

        return result;
    }

    /**
     * フォームセッティング
     */
    private settingForms(): void {
        this.password = this.formGroup.controls['password'];
    }

}






