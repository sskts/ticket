import { Component, OnInit } from '@angular/core';
import {
    AwsCognitoService,
    SmartTheaterService,
    UserService,
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
        private userService: UserService,
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
            body: `
            <p>会員移行した場合もとの状態に戻すことはできません。<br>
            ユーザーネームが必要な場合ががございます。<br>
            メモをとるなどして、必ずお控えください。<br>
            ユーザーネーム: <strong>${this.userService.data.userName}</strong></p>`,
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
        let service: {
            params: any;
            method: string;
            level: 'error' | 'info' | 'warn';
        } = { params: '', method: 'newMembershipTransfer', level: 'error' };
        try {
            const {
                newMembershipTransferUrl,
                // membershipExpirationTimeSeconds,
            } = await this.utilService.getJson<{
                newMembershipTransferUrl: string;
                membershipExpirationTimeSeconds: string;
            }>(`/api/config?date${new Date().toISOString()}`);
            await this.smartTheaterService.getServices();
            // const memberships =
            //     await this.smartTheaterService.ownershipInfo.searchMemberships({
            //         page: 1,
            //     });
            // const membership = memberships[0];
            // const now = (await this.utilService.getServerTime()).date;
            // if (
            //     membership === undefined ||
            //     moment(now).diff(moment(membership.ownedThrough), 'seconds') >
            //         Number(membershipExpirationTimeSeconds)
            // ) {
            //     this.isLoading = false;
            //     this.utilService.openAlert({
            //         title: 'エラー',
            //         body: `<p>会員移行に失敗しました。<br>会員有効期限をご確認ください。</p>`,
            //     });
            //     return;
            // }
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
            service = {
                params: {
                    sub,
                    userName,
                    newMembershipTransferUrl,
                },
                method: '[newMembershipTransfer] smartTheaterService.people.remove',
                level: 'error',
            };
            await this.smartTheaterService.people.remove();
            service = {
                params: {
                    sub,
                    userName,
                    newMembershipTransferUrl,
                },
                method: '[newMembershipTransfer] awsCognitoService.people.deleteUser',
                level: 'error',
            };
            await this.awsCognitoService.deleteUser();
            service = {
                params: {
                    sub,
                    userName,
                    newMembershipTransferUrl,
                },
                method: '[newMembershipTransfer] smartTheaterService.signOut',
                level: 'error',
            };
            await this.smartTheaterService.signOut();
            this.isLoading = false;
        } catch (error) {
            console.error(error);
            this.utilService.postLog({
                log: JSON.stringify({
                    ...error,
                    message:
                        error.message === undefined
                            ? 'exception error'
                            : error.message,
                }),
                params: JSON.stringify(service.params),
                method: service.method,
                level: service.level,
            });
            this.isLoading = false;
            this.utilService.openAlert({
                title: 'エラー',
                body: `<p>会員移行に失敗しました。</p>`,
            });
        }
    }
}
