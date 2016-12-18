import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-redirect',
    templateUrl: './redirect.component.html',
    styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

    constructor(private router:Router) { }

    public ngOnInit() {
        //ログインチェック
        if (this.isAuth()) {
            //topへ
            this.router.navigate(['/index']);
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

}
