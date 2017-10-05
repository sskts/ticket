/**
 * LoginSelectComponent
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SasakiService } from '../../service/sasaki/sasaki.service';

@Component({
    selector: 'app-login',
    templateUrl: './login-select.component.html',
    styleUrls: ['./login-select.component.scss']
})
export class LoginSelectComponent implements OnInit {
    public isLoading: boolean;

    constructor(
        private sasaki: SasakiService,
        private router: Router
    ) { }

    public ngOnInit() {
        this.isLoading = false;
    }

    public async login() {
        try {
            const result = await this.sasaki.auth.signIn();
            this.sasaki.credentials = result;
            this.isLoading = true;
            this.router.navigate(['/']);
        } catch (error) {
            console.error(error);
            this.isLoading = false;
        }
    }
}
