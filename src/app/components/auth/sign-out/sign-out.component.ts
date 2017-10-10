/**
 * SignOutComponent
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoggedInCallback } from '../../../service/cognito/cognito.service';
import { UserLoginService } from '../../../service/user-login/user-login.service';

@Component({
    selector: 'app-sign-out',
    templateUrl: './sign-out.component.html',
    styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit, LoggedInCallback {
    constructor(
        private router: Router,
        private userLogin: UserLoginService
    ) {}

    public ngOnInit() {
        this.userLogin.isAuthenticated(this);
    }

    public async isLoggedIn(message: string, isLoggedIn: boolean) {
        console.log('message', message);
        if (isLoggedIn) {
            this.userLogin.logout();
        }
        this.router.navigate(['/']);
    }
}
