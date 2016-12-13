import { Component, Inject, forwardRef } from '@angular/core';
import { PageComponent } from '../../../components/pages/PageComponent';

@Component({
    selector: 'auth',
    template: `
    <div class="contents auth">
        <div class="logo"><img src="/images/logo.jpg"></div>
        <div class="page-ttl">新規会員登録 / ログイン</div>
        <dl>
            <dt>初めて会員登録をする方は下のボタンよりご登録ください</dt>
            <dd>
                <div class="blue-button button" routerLink="/regist/input">会員登録する</div>
            </dd>
        </dl>
        <dl>
            <dt>既に会員登録済みの方は下のボタンよりログインしてください</dt>
            <dd>
                <div class="blue-button button" routerLink="/auth/login">ログインする</div>
                <a routerLink="/regist/password">パスワードを忘れた方はこちら</a>
            </dd>
        </dl>
    </div>
    `
})
export class AuthComponent {

    
}

