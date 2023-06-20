import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getConfig, getStorageItem } from '../../../../../functions';
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
    public mypageSiteUrl: string;
    public applicationStatus?: ApplicationStatus;
    public isNewMembershipTransfer: boolean;
    public userName?: string;

    constructor(
        private router: Router,
        private user: UserService,
        private awsCognito: AwsCognitoService,
        private callNativeService: CallNativeService,
        private utilService: UtilService
    ) {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        try {
            this.isLoading = false;
            this.portalSiteUrl = getConfig().portalSiteUrl;
            this.mypageSiteUrl = getConfig().mypageSiteUrl;
            this.applicationStatus = ApplicationStatus.NO_RELEASE;
            const { status } = await this.utilService.getApplicationStatus();
            const data = getStorageItem<{
                sub: string;
                userName: string;
                newMembershipTransferUrl: string;
            }>({
                storageType: 'localStorage',
                key: 'TRANSFER',
            });
            this.applicationStatus = status;
            this.isNewMembershipTransfer =
                status !== ApplicationStatus.NO_RELEASE && data !== undefined;
            this.userName = data === undefined ? undefined : data.userName;
        } catch (error) {}
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
        this.callNativeService.inAppBrowser({
            url: url,
            target: InAppBrowserTarget.System,
        });
    }

    /**
     * 会員移行
     */
    public newMembershipTransfer() {
        const data = getStorageItem<{
            sub: string;
            userName: string;
            newMembershipTransferUrl: string;
        }>({
            storageType: 'localStorage',
            key: 'TRANSFER',
        });
        if (data === undefined) {
            this.utilService.openAlert({
                title: 'エラー',
                body: '会員移行に失敗しました。',
            });
            return;
        }
        this.utilService.postLog({
            log: JSON.stringify(data),
            params: data.sub,
            method: 'transfer.redirect',
        });
        this.callNativeService.inAppBrowser({
            url: `${data.newMembershipTransferUrl}&sub=${data.sub}`,
            target: InAppBrowserTarget.System,
        });
    }
}
