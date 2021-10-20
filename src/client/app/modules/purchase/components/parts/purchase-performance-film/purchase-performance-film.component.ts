/**
 * PurchasePerformanceFilmComponent
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    filterPerformancebyMovie,
    hasDisplayPerformance,
    schedule2Performance,
} from '../../../../../functions';
import { Performance } from '../../../../../models/performance';
import { ISchedule } from '../../../../../models/schedule';

@Component({
    selector: 'app-purchase-performance-film',
    templateUrl: './purchase-performance-film.component.html',
    styleUrls: ['./purchase-performance-film.component.scss'],
})
export class PurchasePerformanceFilmComponent implements OnInit {
    @Input() public schedule: ISchedule;
    @Input() public member: boolean;
    @Output() public selectPerformance = new EventEmitter<{
        performance: Performance;
    }>();
    public filterPerformancebyMovie = filterPerformancebyMovie;
    public performances: Performance[];
    public hasDisplayPerformance = hasDisplayPerformance;

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
