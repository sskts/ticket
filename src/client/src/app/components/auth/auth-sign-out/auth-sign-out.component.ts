import { Component, OnInit } from '@angular/core';
import { SasakiService } from '../../../services/sasaki/sasaki.service';

@Component({
    selector: 'app-auth-sign-out',
    templateUrl: './auth-sign-out.component.html',
    styleUrls: ['./auth-sign-out.component.scss']
})
export class AuthSignOutComponent implements OnInit {
    public isLoading: boolean;

    constructor(
        private sasaki: SasakiService
    ) { }

    public ngOnInit() {
        this.isLoading = false;
    }

    public async signOut() {
        this.isLoading = true;
        try {
            await this.sasaki.signOut();
        } catch {
            this.isLoading = false;
        }
    }

}
