/**
 * FilmOrderComponent
 */
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import { IIndividualScreeningEvent } from '../../../model/screening-events/screening-events.model';
import { AwsCognitoService } from '../../../service/aws-cognito/aws-cognito.service';

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

    constructor(
        private awsCognito: AwsCognitoService
    ) { }

    public ngOnInit() {
        this.moment = moment;
        this.nowDate = moment();
        this.filmInfo = this.data.films[0];
        console.log(10 <= 111);
    }

    public performanceSelect(data: IIndividualScreeningEvent) {
        location.href =
            `${environment.ticketingSite}/purchase/app.html?id=${data.identifier}&identityId=${this.awsCognito.credentials.identityId}`;
    }

}
