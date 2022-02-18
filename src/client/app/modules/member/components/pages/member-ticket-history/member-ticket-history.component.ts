/**
 * MemberTicketHistoryComponent
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import {
    OwnershipInfoType,
    ReservationService,
    SmartTheaterService,
    UserService,
} from '../../../../../services';

@Component({
    selector: 'app-member-ticket-history',
    templateUrl: './member-ticket-history.component.html',
    styleUrls: ['./member-ticket-history.component.scss'],
})
/**
 * チケット履歴
 * @class MemberTicketHistoryComponent
 * @implements OnInit
 */
export class MemberTicketHistoryComponent implements OnInit {
    public isLoading: boolean;
    public reservations: OwnershipInfoType.IEventService[];
    public touch: boolean;

    constructor(
        private router: Router,
        private reservation: ReservationService,
        public user: UserService,
        private smartTheaterService: SmartTheaterService
    ) {}

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
            await this.smartTheaterService.getServices();
            const eventServices =
                await this.smartTheaterService.ownershipInfo.searchEventService(
                    {}
                );
            const now = moment();
            this.reservations = eventServices.filter((r) => {
                return (
                    moment(r.typeOfGood.reservationFor.endDate).unix() <
                    now.unix()
                );
            });
        } catch (err) {
            this.router.navigate(['/error', { redirect: '/ticket' }]);
            console.log(err);
        }

        this.isLoading = false;
    }
}
