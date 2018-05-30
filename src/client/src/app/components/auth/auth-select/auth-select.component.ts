import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AwsCognitoService } from '../../../services/aws-cognito/aws-cognito.service';
import { SasakiService } from '../../../services/sasaki/sasaki.service';
import { MemberType, UserService } from '../../../services/user/user.service';

@Component({
    selector: 'app-auth-select',
    templateUrl: './auth-select.component.html',
    styleUrls: ['./auth-select.component.scss']
})
export class AuthSelectComponent implements OnInit {

    public isLoading: boolean;

    constructor(
        private sasaki: SasakiService,
        private router: Router,
        private user: UserService,
        private awsCognito: AwsCognitoService
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit(): void {
        this.isLoading = false;
    }

    /**
     * サインイン
     * @method signIn
     */
    public async signIn() {
        this.isLoading = true;
        try {
            await this.sasaki.signIn();
            this.user.data.memberType = MemberType.Member;
            this.user.save();
        } catch (error) {
            console.error(error);
            this.isLoading = false;
        }
    }

    /**
     * スタート
     * @method start
     */
    public async start() {
        this.isLoading = true;
        const deviceId = localStorage.getItem('deviceId');
        this.user.data.memberType = MemberType.NotMember;
        this.user.save();
        if (deviceId === null) {
            this.router.navigate(['/walkThrough']);
            return;
        }
        try {
            await this.awsCognito.authenticateWithDeviceId();
            if (this.awsCognito.credentials === undefined) {
                throw new Error('credentials is undefined');
            }
            this.router.navigate(['/']);
        } catch (err) {
            console.error(err);
            this.isLoading = false;
        }
    }

}
