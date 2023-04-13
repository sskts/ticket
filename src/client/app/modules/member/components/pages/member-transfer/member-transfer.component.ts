import { Component, OnInit } from '@angular/core';
import {
    AwsCognitoService,
    SmartTheaterService,
    UtilService,
} from '../../../../../services';

@Component({
    selector: 'app-member-transfer',
    templateUrl: './member-transfer.component.html',
    styleUrls: ['./member-transfer.component.scss'],
})
export class MemberTransferComponent implements OnInit {
    public isLoading: boolean;
    constructor(
        private smartTheaterService: SmartTheaterService,
        private utilService: UtilService,
        private awsCognitoService: AwsCognitoService
    ) {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
        this.isLoading = false;
    }

    /**
     * 退会確認
     */
    public confirmTransfer() {
        this.utilService.openConfirm({
            title: '本当に会員移行しますか？',
            body: '会員移行した場合もとの状態に戻すことはできません。',
            cb: () => {
                this.newMembershipTransfer();
            },
        });
    }

    /**
     * 会員移行
     * @method transfer
     */
    public async newMembershipTransfer() {
        this.isLoading = true;
        try {
            const { newMembershipTransferUrl } =
                await this.utilService.getJson<{
                    newMembershipTransferUrl: string;
                }>(`/api/config?date${new Date().toISOString()}`);
            const { sub, userName } = await this.awsCognitoService.authorize();
            const json = JSON.stringify({
                sub,
                userName,
                newMembershipTransferUrl,
            });
            this.utilService.postLog({
                log: json,
                params: sub,
                method: 'transfer.start',
            });
            localStorage.setItem('TRANSFER', json);
            sessionStorage.setItem('TRANSFER', json);
            this.isLoading = false;
            await this.smartTheaterService.getServices();
            await this.smartTheaterService.people.remove();
            await this.awsCognitoService.deleteUser();
            await this.smartTheaterService.signOut();
        } catch (err) {
            console.error(err);
            this.isLoading = false;
        }
    }
}
