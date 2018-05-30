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

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
        const addMinutes = 30;
        const startDate = moment(this.performance.startDate).unix();
        const addDate = moment().add(addMinutes, 'minutes').unix();
        this.salseFlg = (startDate > addDate);
    }

    /**
     * パフォーマンス選択
     * @method performanceSelect
     */
    public async performanceSelect() {
        this.purchase.performanceRedirect(this.performance);
    }

}
