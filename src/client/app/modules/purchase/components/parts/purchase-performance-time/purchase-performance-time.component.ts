import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { filterPerformancebyMovie, schedule2Performance } from '../../../../../functions';
import { Performance } from '../../../../../models/performance';
import { ISchedule } from '../../../../../models/schedule';

@Component({
    selector: 'app-purchase-performance-time',
    templateUrl: './purchase-performance-time.component.html',
    styleUrls: ['./purchase-performance-time.component.scss']
})
export class PurchasePerformanceTimeComponent implements OnInit {
    @Input() public schedule: ISchedule;
    @Input() public member: boolean;
    @Output() public select: EventEmitter<{ id: string }> = new EventEmitter();
    public filterPerformancebyMovie = filterPerformancebyMovie;
    public performances: Performance[];

    constructor() { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
        this.performances = schedule2Performance(this.schedule, this.member)
            .filter(p => p.isDisplay());
    }

}
