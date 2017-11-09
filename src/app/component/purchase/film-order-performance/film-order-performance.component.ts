/**
 * FilmOrderPerformanceComponent
 */
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import { AwsCognitoService } from '../../../service/aws-cognito/aws-cognito.service';
import { IIndividualScreeningEvent } from '../../../service/schedule/schedule.service';

@Component({
    selector: 'app-film-order-performance',
    templateUrl: './film-order-performance.component.html',
    styleUrls: ['./film-order-performance.component.scss']
})
export class FilmOrderPerformanceComponent implements OnInit {
    @Input() public performance: IIndividualScreeningEvent;
    public salseFlg: boolean;

    constructor(private awsCognito: AwsCognitoService) { }

    /**
     * 初期化
     * @method ngOnInit
     * @returns {Promise<void>}
     */
    public ngOnInit(): void {
        this.salseFlg = moment(this.performance.startDate).unix() > moment().add(30, 'minutes').unix();
    }

    public performanceSelect(data: IIndividualScreeningEvent) {
        location.href =
            `${environment.ticketingSite}/purchase/app.html?id=${data.identifier}&identityId=${this.awsCognito.credentials.identityId}`;
    }

}
