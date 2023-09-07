import { Component, OnInit } from '@angular/core';
import { CallNativeService, InAppBrowserTarget } from '../../../../../services';

@Component({
    selector: 'app-member-mypage-close',
    templateUrl: './member-mypage-close.component.html',
    styleUrls: ['./member-mypage-close.component.scss'],
})
export class MemberMypageCloseComponent implements OnInit {
    public isLoading: boolean;

    constructor(private callNativeService: CallNativeService) {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        this.isLoading = false;
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
