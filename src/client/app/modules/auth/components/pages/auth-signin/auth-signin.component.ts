import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    AwsCognitoService,
    SmartTheaterService,
} from '../../../../../services';
import { MemberType, UserService } from '../../../../../services/user.service';

@Component({
    selector: 'app-auth-signin',
    templateUrl: './auth-signin.component.html',
    styleUrls: ['./auth-signin.component.scss'],
})
export class AuthSigninComponent implements OnInit {
    public isLoading: boolean;
    constructor(
        private router: Router,
        private userService: UserService,
        private awsCognitoService: AwsCognitoService,
        private smartTheaterService: SmartTheaterService
    ) {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        try {
            this.userService.load();
            this.userService.data.memberType = MemberType.Member;
            this.userService.save();
            try {
                await this.smartTheaterService.authorize();
            } catch {
                await this.smartTheaterService.signIn();
                return;
            }
            try {
                await this.awsCognitoService.authorize();
            } catch {
                await this.awsCognitoService.signIn();
                return;
            }
            await this.userService.initMember();
            this.router.navigate(['/']);
        } catch (err) {
            console.error(err);
            this.router.navigate(['/error', { redirect: '/auth/select' }]);
        }
    }
}
