import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { IIndividualScreeningEvent, PurchaseService } from '../../../services/purchase/purchase.service';

@Component({
    selector: 'app-purchase-performance-time',
    templateUrl: './purchase-performance-time.component.html',
    styleUrls: ['./purchase-performance-time.component.scss']
})
export class PurchasePerformanceTimeComponent implements OnInit {
    @Input() public performance: IIndividualScreeningEvent;
    public salseFlg: boolean;

    constructor(
        private purchase: PurchaseService
    ) { }

    public ngOnInit() {
        this.salseFlg = moment(this.performance.startDate).unix() > moment().add(30, 'minutes').unix();
    }

    /**
     * パフォーマンス選択
     * @method performanceSelect
     */
    public async performanceSelect() {
        this.purchase.performanceRedirect(this.performance);
    }

}
