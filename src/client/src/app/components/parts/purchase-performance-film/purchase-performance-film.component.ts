/**
 * PurchasePerformanceFilmComponent
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { factory } from '@motionpicture/sskts-api-abstract-client';
import { isAfterPeriod, isBeforePeriod, isSalse, isWindow } from '../../../functions';

type IEvent = factory.chevre.event.screeningEvent.IEvent;

@Component({
    selector: 'app-purchase-performance-film',
    templateUrl: './purchase-performance-film.component.html',
    styleUrls: ['./purchase-performance-film.component.scss']
})
export class PurchasePerformanceFilmComponent implements OnInit {
    @Input() public performance: IEvent;
    @Output() public select: EventEmitter<{}> = new EventEmitter();
    public isSalse = isSalse;
    public isWindow = isWindow;
    public isBeforePeriod = isBeforePeriod;
    public isAfterPeriod = isAfterPeriod;

    constructor() { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {}

}

