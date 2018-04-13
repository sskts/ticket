/**
 * PurchasePerformanceFilmComponent
 */
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { IIndividualScreeningEvent, PurchaseService } from '../../../services/purchase/purchase.service';

@Component({
    selector: 'app-purchase-performance-film',
    templateUrl: './purchase-performance-film.component.html',
    styleUrls: ['./purchase-performance-film.component.scss']
})
export class PurchasePerformanceFilmComponent implements OnInit {
    @Input() public performance: IIndividualScreeningEvent;
    public salseFlg: boolean;

    constructor(
        private purchase: PurchaseService
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     * @returns {void}
     */
    public ngOnInit(): void {
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

