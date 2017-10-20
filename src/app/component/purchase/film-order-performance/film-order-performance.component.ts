/**
 * FilmOrderPerformanceComponent
 */
import { Component, Input, OnInit } from '@angular/core';
import * as sasaki from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';

export type IIndividualScreeningEvent = sasaki.factory.event.individualScreeningEvent.IEventWithOffer;

@Component({
    selector: 'app-film-order-performance',
    templateUrl: './film-order-performance.component.html',
    styleUrls: ['./film-order-performance.component.scss']
})
export class FilmOrderPerformanceComponent implements OnInit {
    @Input() public performance: IIndividualScreeningEvent;
    public salseFlg: boolean;

    constructor() { }

    public ngOnInit() {
        this.salseFlg = moment(this.performance.startDate).unix() > moment().add(30, 'minutes').unix();
    }

}
