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
import { IMovie, ISchedule } from '../../../../../models/schedule';

@Component({
    selector: 'app-purchase-movie',
    templateUrl: './purchase-movie.component.html',
    styleUrls: ['./purchase-movie.component.scss'],
})
export class PurchaseMoveComponent implements OnInit {
    @Input() public schedule: ISchedule;
    @Input() public movie: IMovie;
    @Input() public member: boolean;
    @Output() public selectPerformance = new EventEmitter<{
        performance: Performance;
    }>();
    public performances: Performance[];
    public isDisplay: boolean;

    constructor() {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
        const performances = schedule2Performance(
            this.schedule,
            this.member
        ).filter((p) => p.isDisplay());
        this.isDisplay = hasDisplayPerformance(performances, this.movie);
        if (!this.isDisplay) {
            return;
        }
        this.performances = filterPerformancebyMovie(performances, this.movie);
    }
}
