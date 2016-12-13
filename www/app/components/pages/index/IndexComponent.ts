import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageComponent } from '../../../components/pages/PageComponent';

@Component({
    selector: 'index',
    template: `
        <page>index</page>
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
        let storage: Storage = sessionStorage;
        if (storage.getItem('user')) {
            result = true;
        }
        return result;
    }
}

