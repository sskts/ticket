/**
 * TicketHolderComponent
 */
import { Component, OnInit } from '@angular/core';
import * as sasaki from '@motionpicture/sskts-api-javascript-client';
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
    public purchaseNumberOrders: sasaki.factory.order.IOrder[];

    constructor(
        private awsCognito: AwsCognitoService
    ) { }

    public async ngOnInit() {
        this.isLoading = true;
        this.purchaseNumberOrders = [];
        this.config = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoHeight: true
        };
        try {
            const reservationRecord = await this.awsCognito.getRecords('reservation');
            this.reservation = new ReservationModel(reservationRecord);
            this.purchaseNumberOrders = this.reservation.getReservationByPurchaseNumberOrder();
        } catch (err) {
            console.log(err);
        }
        this.isLoading = false;
    }

}
