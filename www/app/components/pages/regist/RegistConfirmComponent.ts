import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


@Component({
    selector: 'regist-confirm',
    template: `
    <header pageName="新規会員登録"></header>
    <div class="contents">
        <p class="read">
            お客様情報をご確認ください。<br>
            問題ないようでしたら「ワンタイムパスワードを発行する」ボタンを押してください。<br>
            その後ご登録頂いたメールアドレス宛にワンタイムパスワードを発行しますので次のページでそちらを登録してください。
        </p>
        <form class="form" [formGroup]="formGroup" (ngSubmit)="onSubmit(formGroup.value)">
            <dl>
                <dt>お名前（セイ）</dt>
                <dd>{{user.lastName}}</dd>
            </dl>
            <dl>
                <dt>お名前（メイ）</dt>
                <dd>{{user.firstName}}</dd>
            </dl>
            <dl>
                <dt>メールアドレス</dt>
                <dd>{{user.mail}}</dd>
            </dl>
            <dl>
                <dt>電話番号</dt>
                <dd>{{user.tel}}</dd>
            </dl>
            <dl>
                <dt>パスワード</dt>
                <dd>{{user.password}}</dd>
            </dl>
            <div *ngIf="user.credit">
                <dl>
                    <dt>クレジットカード情報</dt>
                </dl>
                <dl>
                    <dt>カード番号</dt>
                    <dd>{{user.creditNo}}</dd>
                </dl>
                <dl>
                    <dt>名義人</dt>
                    <dd>{{user.holderName}}</dd>
                </dl>
            </div>
            
            <div class="button-area">
                <button class="blue-button button" type="submit">ワンタイムパスワード発行</button>
                <div class="blue-button button" routerLink="/regist/input">戻る</div>
            </div>
        </form>
    </div>
    `
})
export class RegistConfirmComponent {
    public formGroup: FormGroup;
    public user: any;

    

    constructor(private formBuilder: FormBuilder, private router: Router) {
        this.formGroup = formBuilder.group({});
        this.user = JSON.parse(sessionStorage.getItem('user'));
    }

    /**
     * ワンタイムパスワード発行
     */
    public onSubmit(value: string): void {
        this.router.navigate(['regist/password']);
    }

    

}



