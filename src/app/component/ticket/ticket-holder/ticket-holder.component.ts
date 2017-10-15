/**
 * TicketHolderComponent
 */
import { Component, OnInit } from '@angular/core';

import { ReservationModel } from '../../../model/reservation/reservation.model';
import { AwsCognitoService } from '../../../service/aws-cognito/aws-cognito.service';

@Component({
    selector: 'app-ticket-holder',
    templateUrl: './ticket-holder.component.html',
    styleUrls: ['./ticket-holder.component.scss']
})
/**
 * チケットホルダー
 * @class TicketHolderComponent
 * @implements OnInit
 */
export class TicketHolderComponent implements OnInit {
    public config: SwiperOptions;
    public isLoading: boolean;
    public reservation: ReservationModel;

    constructor(
        private awsCognito: AwsCognitoService
    ) { }

    public async ngOnInit() {
        this.isLoading = true;
        this.config = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoHeight: true
        };
        try {
            const reservationRecord = await this.awsCognito.getRecords('reservation');
            this.reservation = new ReservationModel(reservationRecord);
        } catch (err) {
            console.log(err);
        }
        this.isLoading = false;
    }

}
