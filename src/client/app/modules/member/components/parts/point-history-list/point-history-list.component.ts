import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { OwnershipInfoType } from '../../../../../services';

@Component({
    selector: 'app-point-history-list',
    templateUrl: './point-history-list.component.html',
    styleUrls: ['./point-history-list.component.scss'],
})
export class PointHistoryListComponent implements OnInit {
    @Input() public action: OwnershipInfoType.IMoneyTransferAction;
    @Input() public accountNumber: string;
    public circle: string;
    public description: string;
    public amount: string;
    public date: string;

    constructor() {}

    public ngOnInit() {
        const transactionType = this.action.purpose.typeOf;
        this.date = moment(this.action.startDate).format(
            'YYYY年MM月DD日 HH:mm'
        );
        this.description =
            this.action.description !== undefined
                ? this.action.description.replace(/\,/g, '<br>')
                : '';
        const amount =
            typeof this.action.amount === 'number'
                ? this.action.amount
                : this.action.amount.value === undefined
                ? 0
                : this.action.amount.value;
        if (transactionType === 'Deposit') {
            this.circle = amount < 0 ? 'blue' : '';
            this.amount = amount < 0 ? String(amount) : `+${amount}`;
            return;
        }
        if (transactionType === 'Transfer') {
            this.circle = '';
            this.amount = `+${amount}`;
            return;
        }
        if (transactionType === 'Withdraw') {
            this.circle = amount > 0 ? 'blue' : '';
            this.amount = amount > 0 ? String(amount * -1) : String(amount);
            return;
        }
    }
}
