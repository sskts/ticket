/**
 * MemberTicketHistoryComponent
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@motionpicture/sskts-api-javascript-client';
import { ReservationService } from '../../../../services/reservation/reservation.service';
import { SasakiService } from '../../../../services/sasaki/sasaki.service';
import { UserService } from '../../../../services/user/user.service';
import * as moment from 'moment';

@Component({
    selector: 'app-member-ticket-history',
    templateUrl: './member-ticket-history.component.html',
    styleUrls: ['./member-ticket-history.component.scss']
})
/**
 * チケット履歴
 * @class MemberTicketHistoryComponent
 * @implements OnInit
 */
export class MemberTicketHistoryComponent implements OnInit {
    public isLoading: boolean;
		public reservations: factory.ownershipInfo.IOwnershipInfo<factory.chevre.reservation.IReservation<factory.chevre.priceSpecification.IPriceSpecification<factory.chevre.priceSpecificationType>>>[];
    public touch: boolean;

    constructor(
        private router: Router,
        private reservation: ReservationService,
        public user: UserService,
        private sasaki: SasakiService
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        this.touch = true;
        this.isLoading = true;
        this.reservations = [];
        this.reservation.isMember = this.user.isMember();
        try {
            await this.sasaki.getServices();
            const result = await this.sasaki.ownerShip.search<factory.chevre.reservationType.EventReservation>({
                id: 'me',
                typeOfGood: {
                    typeOf: factory.chevre.reservationType.EventReservation
                }
            });
            const now = moment();
            this.reservations = result.data.filter((reservation) => {
                return moment(reservation.typeOfGood.reservationFor.endDate).unix() < now.unix();
            });
        } catch (err) {
            this.router.navigate(['/error', { redirect: '/ticket' }]);
            console.log(err);
        }

        this.isLoading = false;
    }
}
