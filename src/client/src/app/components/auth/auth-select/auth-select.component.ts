import { Component, OnInit } from '@angular/core';
import { SasakiService } from '../../../services/sasaki/sasaki.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth-select',
    templateUrl: './auth-select.component.html',
    styleUrls: ['./auth-select.component.scss']
})
export class AuthSelectComponent implements OnInit {

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
