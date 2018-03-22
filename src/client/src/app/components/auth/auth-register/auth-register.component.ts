import { Component, OnInit } from '@angular/core';
import { SasakiService } from '../../../services/sasaki/sasaki.service';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss']
})
export class AuthRegisterComponent implements OnInit {

    public isLoading: boolean;

    constructor(
        private sasaki: SasakiService
    ) { }

    public ngOnInit(): void {
        this.isLoading = false;
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

}
