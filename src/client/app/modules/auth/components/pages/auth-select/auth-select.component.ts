import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getConfig } from '../../../../../functions';
import {
    AwsCognitoService,
    CallNativeService,
    CinerinoService,
    InAppBrowserTarget,
    MemberType,
    UserService,
} from '../../../../../services';

@Component({
    selector: 'app-auth-select',
    templateUrl: './auth-select.component.html',
    styleUrls: ['./auth-select.component.scss'],
})
export class AuthSelectComponent implements OnInit {
    public isLoading: boolean;
    public portalSiteUrl: string;

    constructor(
        private cinerino: CinerinoService,
        private router: Router,
        private user: UserService,
        private awsCognito: AwsCognitoService,
        private callNative: CallNativeService
    ) {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
        this.isLoading = false;
        this.portalSiteUrl = getConfig().portalSiteUrl;
    }

    /**
     * サインイン
     * @method signIn
     */
    public async signIn() {
        this.isLoading = true;
        try {
            const userName =
                this.user === null ||
                this.user === undefined ||
                this.user.data === null ||
                this.user.data === undefined ||
                this.user.data.accounts === null ||
                this.user.data.accounts === undefined
                    ? ''
                    : this.user.data.accounts.length > 0
                    ? typeof this.user.data.accounts[0].typeOfGood.name ===
                      'string'
                        ? this.user.data.accounts[0].typeOfGood.name
                        : this.user.data.accounts[0].typeOfGood.name !==
                              undefined &&
                          this.user.data.accounts[0].typeOfGood.name.ja !==
                              undefined
                        ? this.user.data.accounts[0].typeOfGood.name.ja
                        : ''
                    : this.user.data.prevUserName !== undefined
                    ? this.user.data.prevUserName
                    : '';
            await this.cinerino.signInWithUserName(false, userName);
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

    /**
     * webブラウザで開く
     * @method openWebBrowser
     */
    public openWebBrowser(url: string) {
        this.callNative.inAppBrowser({
            url: url,
            target: InAppBrowserTarget.System,
        });
    }
}
