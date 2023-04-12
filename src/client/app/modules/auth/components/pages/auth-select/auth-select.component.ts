import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getConfig } from '../../../../../functions';
import { ApplicationStatus } from '../../../../../models/util';
import {
    AwsCognitoService,
    CallNativeService,
    InAppBrowserTarget,
    MemberType,
    UserService,
    UtilService,
} from '../../../../../services';

@Component({
    selector: 'app-auth-select',
    templateUrl: './auth-select.component.html',
    styleUrls: ['./auth-select.component.scss'],
})
export class AuthSelectComponent implements OnInit {
    public isLoading: boolean;
    public portalSiteUrl: string;
    public applicationStatus?: ApplicationStatus;

    constructor(
        private router: Router,
        private user: UserService,
        private awsCognito: AwsCognitoService,
        private callNative: CallNativeService,
        private utilService: UtilService
    ) {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        this.isLoading = false;
        this.portalSiteUrl = getConfig().portalSiteUrl;
        const { status } = await this.utilService.getApplicationStatus();
        this.applicationStatus = status;
    }

    /**
     * サインイン
     * @method signIn
     */
    public async signIn() {
        this.isLoading = true;
        try {
            this.router.navigate(['/auth/signin']);
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
        try {
            this.isLoading = true;
            await this.user.load();
            this.user.data.memberType = MemberType.NotMember;
            this.user.save();
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
