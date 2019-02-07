/**
 * PurchasePerformanceFilmComponent
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { factory } from '@motionpicture/sskts-api-abstract-client';
import * as moment from 'moment';

type IIndividualScreeningEvent = factory.event.individualScreeningEvent.IEventWithOffer;

@Component({
    selector: 'app-purchase-performance-film',
    templateUrl: './purchase-performance-film.component.html',
    styleUrls: ['./purchase-performance-film.component.scss']
})
export class PurchasePerformanceFilmComponent implements OnInit {
    @Input() public performance: IIndividualScreeningEvent;
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
        this.isWindow = moment(this.performance.startDate).unix() <= moment().add(5, 'minutes').unix();
        this.isNotAccepted = moment(this.performance.coaInfo.rsvStartDate) > moment();
        this.salseFlg = !this.isNotAccepted && !this.isWindow;
    }

}

