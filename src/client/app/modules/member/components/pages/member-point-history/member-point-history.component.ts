import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import { CinerinoService, UserService } from '../../../../../services';

@Component({
    selector: 'app-member-point-history',
    templateUrl: './member-point-history.component.html',
    styleUrls: ['./member-point-history.component.scss'],
})
export class MemberPointHistoryComponent implements OnInit {
    public isLoading: boolean;
    public accountMoneyTransferActions: factory.account.action.moneyTransfer.IAction[];

    constructor(
        public user: UserService,
        private router: Router,
        private cinerino: CinerinoService
    ) {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        this.isLoading = true;
        try {
            this.cinerino.getServices();
            await this.user.updateAccount();
            if (this.user.data.accounts.length === 0) {
                throw new Error('account is not found');
            }
            const accountNumber =
                this.user.data.accounts[0].typeOfGood.identifier;
            if (typeof accountNumber !== 'string') {
                throw new Error('typeOfGood.identifier not string');
            }
            const searchResult =
                await this.cinerino.ownerShipInfo.searchAccountMoneyTransferActions(
                    {
                        accountNumber,
                        limit: 100,
                    }
                );
            this.accountMoneyTransferActions = searchResult.data.filter(
                (a) =>
                    a.actionStatus ===
                    factory.actionStatusType.CompletedActionStatus
            );
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
