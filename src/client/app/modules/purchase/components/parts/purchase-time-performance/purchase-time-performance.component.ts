import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Performance } from '../../../../../models/performance';

@Component({
    selector: 'app-purchase-time-performance',
    templateUrl: './purchase-time-performance.component.html',
    styleUrls: ['./purchase-time-performance.component.scss'],
})
export class PurchaseTimePerformanceComponent implements OnInit {
    @Input() public performance: Performance;
    @Output() public selectPerformance = new EventEmitter<{
        performance: Performance;
    }>();
    public isSalse: boolean;
    public isBeforePeriod: boolean;
    public isAfterPeriod: boolean;
    public isWindow: boolean;
    public availability: {
        symbolText: string;
        image: string;
        className: string;
        text: string;
    };
    public startTime: string;
    public endTime: string;

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
        this.isSalse = this.performance.isSalse();
        this.isBeforePeriod = this.performance.isBeforePeriod();
        this.isAfterPeriod = this.performance.isAfterPeriod();
        this.isWindow = this.performance.isWindow();
        this.availability = this.performance.getAvailability();
        this.startTime = this.performance.getTime('start');
        this.endTime = this.performance.getTime('end');
    }
}
