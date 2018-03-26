import { Component, OnInit } from '@angular/core';
import { SasakiService } from '../../../services/sasaki/sasaki.service';
import { MemberType, UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss']
})
export class AuthRegisterComponent implements OnInit {

    public isLoading: boolean;

    constructor(
        private sasaki: SasakiService,
        private user: UserService
    ) { }

    public ngOnInit(): void {
        this.isLoading = false;
    }

    public async register() {
        this.isLoading = true;
        try {
            this.user.data.memberType = MemberType.Member;
            this.user.save();
            await this.sasaki.signIn();
        } catch (error) {
            console.error(error);
            this.isLoading = false;
        }
    }

}
