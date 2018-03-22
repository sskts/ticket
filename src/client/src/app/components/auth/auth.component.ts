/**
 * AuthComponent
 */
import { Component, OnInit } from '@angular/core';
import { SasakiService } from '../../services/sasaki/sasaki.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    public isLoading: boolean;

    constructor(
        private sasaki: SasakiService,
        private router: Router
    ) { }

    public ngOnInit(): void {
        this.isLoading = false;
    }

    public async signIn() {
        this.isLoading = true;
        try {
            await this.sasaki.signIn();
        } catch (error) {
            console.error(error);
            this.isLoading = false;
        }
    }

    public async register() {
        this.isLoading = true;
        try {
            await this.sasaki.signIn();
        } catch (error) {
            console.error(error);
            this.isLoading = false;
        }
    }

    public async start() {
        this.router.navigate(['/auth/walkThrough']);
    }
}
