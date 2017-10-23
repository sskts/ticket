/**
 * FilmOrderComponent
 */
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { IIndividualScreeningEvent } from '../../../model/screening-events/screening-events.model';

@Component({
    selector: 'app-film-order',
    templateUrl: './film-order.component.html',
    styleUrls: ['./film-order.component.scss']
})
export class FilmOrderComponent implements OnInit {
    @Input() public data: {
        id: string;
        films: IIndividualScreeningEvent[];
    };
    public filmInfo: IIndividualScreeningEvent;
    public moment: typeof moment;
    public nowDate: moment.Moment;

    constructor() { }

    public ngOnInit() {
        this.moment = moment;
        this.nowDate = moment();
        this.filmInfo = this.data.films[0];
    }

}
