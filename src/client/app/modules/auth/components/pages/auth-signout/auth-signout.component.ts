import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStorageItem } from '../../../../../functions';
import {
    AwsCognitoService,
    CallNativeService,
    InAppBrowserTarget,
    MemberType,
    SmartTheaterService,
    UserService,
    UtilService,
} from '../../../../../services';

@Component({
    selector: 'app-auth-signout',
    templateUrl: './auth-signout.component.html',
    styleUrls: ['./auth-signout.component.scss'],
})
export class AuthSignoutComponent implements OnInit {
    constructor(
        private router: Router,
        private userService: UserService,
        private utilService: UtilService,
        private awsCognitoService: AwsCognitoService,
        private smartTheaterService: SmartTheaterService,
        private callNativeService: CallNativeService
    ) {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        try {
            await this.smartTheaterService.signOut();
        } catch {
            try {
                await this.awsCognitoService.signOut();
            } catch {
                this.userService.data.memberType = MemberType.NotMember;
                this.userService.reset();
                const data = getStorageItem<{
                    sub: string;
                    userName: string;
                    newMembershipTransferUrl: string;
                }>({
                    storageType: 'sessionStorage',
                    key: 'TRANSFER',
                });
                if (data !== undefined) {
                    // 会員移行
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
                this.router.navigate(['/auth/select'], { replaceUrl: true });
            }
        }
    }
}
