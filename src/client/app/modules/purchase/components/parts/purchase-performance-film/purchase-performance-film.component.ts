/**
 * PurchasePerformanceFilmComponent
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import {
    isAfterPeriod,
    isBeforePeriod,
    isSalse,
    isScreeningServiceType,
    isWindow
} from '../../../../../functions';

@Component({
    selector: 'app-purchase-performance-film',
    templateUrl: './purchase-performance-film.component.html',
    styleUrls: ['./purchase-performance-film.component.scss']
})
export class PurchasePerformanceFilmComponent implements OnInit {
    @Input() public performance: factory.chevre.event.screeningEvent.IEvent;
    @Output() public select: EventEmitter<{}> = new EventEmitter();
    public isSalse = isSalse;
    public isWindow = isWindow;
    public isBeforePeriod = isBeforePeriod;
    public isAfterPeriod = isAfterPeriod;
    public isScreeningServiceType = isScreeningServiceType;

    constructor() { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() { }

}

