import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    filterPerformancebyMovie,
    schedule2Performance,
} from '../../../../../functions';
import { Performance } from '../../../../../models/performance';
import { ISchedule } from '../../../../../models/schedule';

@Component({
    selector: 'app-purchase-time',
    templateUrl: './purchase-time.component.html',
    styleUrls: ['./purchase-time.component.scss'],
})
export class PurchaseTimeComponent implements OnInit {
    @Input() public schedule: ISchedule;
    @Input() public member: boolean;
    @Output() public selectPerformance = new EventEmitter<{
        performance: Performance;
    }>();
    public filterPerformancebyMovie = filterPerformancebyMovie;
    public performances: Performance[];

    constructor() {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
        this.performances = schedule2Performance(
            this.schedule,
            this.member
        ).filter((p) => p.isDisplay());
    }
}
