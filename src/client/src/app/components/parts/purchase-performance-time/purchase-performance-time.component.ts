import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { factory } from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';

type IEvent = factory.event.screeningEvent.IEvent;

@Component({
    selector: 'app-purchase-performance-time',
    templateUrl: './purchase-performance-time.component.html',
    styleUrls: ['./purchase-performance-time.component.scss']
})
export class PurchasePerformanceTimeComponent implements OnInit {
    @Input() public performance: IEvent;
    @Output() public select: EventEmitter<{}> = new EventEmitter();
    public salseFlg: boolean;
    public isWindow: boolean;
    public isNotAccepted: boolean;

    constructor() { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
        const VALID_TIME = 10;
        this.isWindow = moment(this.performance.startDate).unix() <= moment().add(VALID_TIME, 'minutes').unix();
        this.isNotAccepted = this.performance.coaInfo === undefined || moment(this.performance.coaInfo.rsvStartDate) > moment();
        this.salseFlg = !this.isNotAccepted && !this.isWindow;
    }

}
