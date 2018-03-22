/**
 * TicketComponent
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IReservation, ReservationService } from '../../services/reservation/reservation.service';
import { SasakiService } from '../../services/sasaki/sasaki.service';

@Component({
    selector: 'app-ticket',
    templateUrl: './ticket.component.html',
    styleUrls: ['./ticket.component.scss']
})
/**
 * チケットホルダー
 * @class TicketComponent
 * @implements OnInit
 */
export class TicketComponent implements OnInit {
    public config: SwiperOptions;
    public isLoading: boolean;
    public purchaseNumberOrders: IReservation[];

    constructor(
        private router: Router,
        private reservation: ReservationService,
        private sasaki: SasakiService
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     * @returns {Promise<void>}
     */
    public async ngOnInit(): Promise<void> {
        this.isLoading = true;
        this.purchaseNumberOrders = [];
        this.config = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoHeight: true
        };
        if (!this.sasaki.isMember()) {
            try {
                await this.reservation.getReservation();
                this.purchaseNumberOrders = this.reservation.getReservationByAppreciationDayOrder();
            } catch (err) {
                this.router.navigate(['/error', { redirect: '/purchase' }]);
                console.log(err);
            }
        }

        this.isLoading = false;
    }

}
