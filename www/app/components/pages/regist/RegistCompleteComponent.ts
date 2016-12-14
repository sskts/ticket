import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'regist-complete',
    template: `
    <header pageName="新規会員登録"></header>
    <div class="contents">
        <p class="read">
            会員登録が完了しました。<br>
            ご登録ありがとうございます。<br>
            引き続きシネマサンシャインアプリをお楽しみください。
        </p>
        <div class="blue-button button" routerLink="/">アプリTOPへ</div>
    </div>
    `
})
export class RegistCompleteComponent {
    

    constructor(private router: Router) {
        
    }

}

