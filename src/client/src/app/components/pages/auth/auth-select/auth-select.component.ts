import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AwsCognitoService } from '../../../../services/aws-cognito/aws-cognito.service';
import { SasakiService } from '../../../../services/sasaki/sasaki.service';
import { MemberType, UserService } from '../../../../services/user/user.service';

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
    public ngOnInit() {
        this.isLoading = false;
    }

    /**
     * サインイン
     * @method signIn
     */
    public async signIn() {
        this.isLoading = true;
        try {
            const userName =
                (!this.user || !this.user.data || !this.user.data.accounts) ? '' :
                this.user.data.accounts.length > 0 &&
                this.user.data.accounts[0].typeOfGood ?
                this.user.data.accounts[0].typeOfGood.name :
                this.user.data.prevUserName ? this.user.data.prevUserName : '';
            await this.sasaki.signInWithUserName(false, userName);
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
        this.user.data.memberType = MemberType.NotMember;
        this.user.save();
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
