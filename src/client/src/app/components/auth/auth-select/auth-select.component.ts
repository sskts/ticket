import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberType, SasakiService } from '../../../services/sasaki/sasaki.service';

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
        this.sasaki.saveMemberType(MemberType.NotMember);
        const deviceId = localStorage.getItem('deviceId');
        if (deviceId === null) {
            this.router.navigate(['/walkThrough']);
        } else {
            this.router.navigate(['/']);
        }
    }

}
