/**
 * FilmOrderPerformanceComponent
 */
import { Component, Input, OnInit } from '@angular/core';
import * as sasaki from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import { AwsCognitoService } from '../../../service/aws-cognito/aws-cognito.service';

type IIndividualScreeningEvent = sasaki.factory.event.individualScreeningEvent.IEventWithOffer;

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
     * @returns {void}
     */
    public ngOnInit(): void {
        this.salseFlg = moment(this.performance.startDate).unix() > moment().add(30, 'minutes').unix();
    }

    /**
     * パフォーマンス選択
     * @method performanceSelect
     */
    public performanceSelect() {
        const params = `id=${this.performance.identifier}&identityId=${this.awsCognito.credentials.identityId}`;
        location.href =
            `${environment.entranceServerUrl}/ticket/index.html?${params}`;
    }

}
