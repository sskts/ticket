/**
 * PurchasePerformanceComponent
 */
import { Component, Input, OnInit } from '@angular/core';
import * as sasaki from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import { AwsCognitoService } from '../../../services/aws-cognito/aws-cognito.service';

type IIndividualScreeningEvent = sasaki.factory.event.individualScreeningEvent.IEventWithOffer;

@Component({
  selector: 'app-purchase-performance',
  templateUrl: './purchase-performance.component.html',
  styleUrls: ['./purchase-performance.component.scss']
})
export class PurchasePerformanceComponent implements OnInit {
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
        if (this.performance.offer.availability === 0) {
            return;
        }
        if (this.awsCognito.credentials === undefined) {
            return;
        }
        const params = `id=${this.performance.identifier}&identityId=${this.awsCognito.credentials.identityId}`;
        location.href =
            `${environment.ENTRANCE_SERVER_URL}/ticket/index.html?${params}`;
    }

}

