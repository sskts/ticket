import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import * as qrcode from 'qrcode';
import { getConfig } from '../../../../../functions';
import { ApplicationStatus } from '../../../../../models/util';
import {
    CallNativeService,
    InAppBrowserTarget,
    OwnershipInfoType,
    UserService,
    UtilService,
} from '../../../../../services';

@Component({
    selector: 'app-member-mypage',
    templateUrl: './member-mypage.component.html',
    styleUrls: ['./member-mypage.component.scss'],
})
export class MemberMypageComponent implements OnInit {
    public isLoading: boolean;
    public moment = moment;
    public account: OwnershipInfoType.IPaymentCard;
    public availableBalance: number;
    public portalSiteUrl: string;
    public programMembershipOwnershipInfo: OwnershipInfoType.IMembership;
    public programMembershipOwnershipInfoOwnedThrough: string;
    public applicationStatus: ApplicationStatus;

    constructor(
        public userService: UserService,
        public utilService: UtilService,
        private router: Router,
        private callNativeService: CallNativeService
    ) {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        this.isLoading = true;
        this.availableBalance = 0;
        this.portalSiteUrl = getConfig().portalSiteUrl;
        this.applicationStatus = ApplicationStatus.NO_RELEASE;
        this.programMembershipOwnershipInfoOwnedThrough = '';
        try {
            await this.userService.initMember();
            this.account = this.userService.data.accounts[0];
            const availableBalance = this.userService.getAvailableBalance();
            if (typeof availableBalance === 'number') {
                this.availableBalance = availableBalance;
            }
            this.programMembershipOwnershipInfo =
                this.userService.data.programMembershipOwnershipInfos[0];
            if (this.programMembershipOwnershipInfo !== undefined) {
                this.programMembershipOwnershipInfoOwnedThrough = moment(
                    this.programMembershipOwnershipInfo.ownedThrough
                ).format('YYYY/MM/DD');
            }

            const { status } = await this.utilService.getApplicationStatus();
            this.applicationStatus = status;
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error', { redirect: '/member/mypage' }]);
        }
        this.isLoading = false;
    }

    /**
     * ポイントモーダル表示
     */
    public openPointModal(event: Event) {
        event.preventDefault();
        this.utilService.openAlert({
            title: 'ポイント使用方法',
            body: ' チケット購入ページで券種選択を選択する際に、会員ポイントを使用することができます。<br> そちらでポイントを使用してください。',
        });
    }

    /**
     * コピー
     */
    public copy(params: { value: string; title: string; body: string }) {
        const { value, title, body } = params;
        // テキストエリアを用意する
        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.selectionStart = 0;
        textarea.selectionEnd = textarea.value.length;
        document.body.appendChild(textarea);
        textarea.focus();
        document.execCommand('copy');
        textarea.blur();
        document.body.removeChild(textarea);
        this.utilService.openAlert({
            title,
            body,
        });
    }

    public async openQR(value: string) {
        const option: qrcode.QRCodeToDataURLOptions = {
            margin: 0,
            scale: 5,
        };
        const url = await qrcode.toDataURL(value, option);
        this.utilService.openAlert({
            title: '会員コード',
            body: `<div class="text-center"><img src="${url}"></div>`,
        });
    }

    /**
     * webブラウザで開く
     */
    public openWebBrowser(url: string) {
        this.callNativeService.inAppBrowser({
            url: url,
            target: InAppBrowserTarget.System,
        });
    }
}
