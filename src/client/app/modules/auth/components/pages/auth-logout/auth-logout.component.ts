import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth-logout',
    templateUrl: './auth-logout.component.html',
    styleUrls: ['./auth-logout.component.scss'],
})
export class AuthLogoutComponent implements OnInit {
    public isLoading: boolean;

    constructor(private router: Router) {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
        this.isLoading = false;
    }

    /**
     * サインアウト
     * @method signOut
     */
    public async signOut() {
        this.router.navigate(['/auth/signout']);
    }
}
