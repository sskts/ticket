import { Component, OnInit } from '@angular/core';
import {
    AwsCognitoService,
    SmartTheaterService,
    UtilService,
} from '../../../../../services';

@Component({
    selector: 'app-member-withdraw',
    templateUrl: './member-withdraw.component.html',
    styleUrls: ['./member-withdraw.component.scss'],
})
export class MemberWithdrawComponent implements OnInit {
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
    public confirmWithdraw() {
        this.utilService.openConfirm({
            title: '本当に退会しますか？',
            body: '退会した場合は保有していた全てのポイントが無効となり、本アプリに登録されていた会員情報は全て消去されます。',
            cb: () => {
                this.withdraw();
            },
        });
    }

    /**
     * 退会
     * @method withdraw
     */
    public async withdraw() {
        this.isLoading = true;
        try {
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
