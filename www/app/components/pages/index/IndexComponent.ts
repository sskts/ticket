import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'index',
    template: `
        <header pageName="TOP"></header>
        <div class="contents">
            <div class="button blue-button" (click)="initStorage()">ストレージ初期化</div>
        </div>
        <navigation activeNo="0"></navigation>
    `
})
export class IndexComponent implements OnInit {
    constructor(private router:Router) {
        
    }

    /**
     * 初期化
     */
    public ngOnInit() {
        //ログインチェック
        if (this.isAuth()) {

        } else {
            //認証画面へ
            this.router.navigate(['/auth']);
        }
    }

    /**
     * ログインチェック
     */
    private isAuth(): boolean {
        let result = false;
        if (localStorage.getItem('user')) {
            result = true;
        }
        return result;
    }

    /**
     * Storage初期化
     */
    public initStorage(): void {
        localStorage.removeItem('user');
        this.ngOnInit();
    }
}

