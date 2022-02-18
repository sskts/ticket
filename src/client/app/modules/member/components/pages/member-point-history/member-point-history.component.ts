import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    OwnershipInfoType,
    SmartTheaterService,
    UserService,
} from '../../../../../services';

@Component({
    selector: 'app-member-point-history',
    templateUrl: './member-point-history.component.html',
    styleUrls: ['./member-point-history.component.scss'],
})
export class MemberPointHistoryComponent implements OnInit {
    public isLoading: boolean;
    public accountMoneyTransferActions: OwnershipInfoType.IMoneyTransferAction[];

    constructor(
        public user: UserService,
        private router: Router,
        private smartTheaterService: SmartTheaterService
    ) {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        this.isLoading = true;
        try {
            await this.user.updateAccount();
            if (this.user.data.accounts.length === 0) {
                throw new Error('account is not found');
            }
            this.smartTheaterService.getServices();
            const ownershipInfoId = this.user.data.accounts[0].id;
            this.accountMoneyTransferActions =
                await this.smartTheaterService.ownershipInfo.searchMoneyTransferActions(
                    {
                        ownershipInfoId,
                        page: 1,
                    }
                );
            // this.accountMoneyTransferActions = searchResult.data.filter(
            //     (a) =>
            //         a.actionStatus ===
            //         factory.actionStatusType.CompletedActionStatus
            // );
        } catch (error) {
            console.error(error);
            this.router.navigate([
                '/error',
                { redirect: '/member/point/history' },
            ]);
        }
        this.isLoading = false;
    }
}
