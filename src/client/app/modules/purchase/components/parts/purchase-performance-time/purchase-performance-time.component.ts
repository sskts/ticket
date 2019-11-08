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
    selector: 'app-purchase-performance-time',
    templateUrl: './purchase-performance-time.component.html',
    styleUrls: ['./purchase-performance-time.component.scss']
})
export class PurchasePerformanceTimeComponent implements OnInit {
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
