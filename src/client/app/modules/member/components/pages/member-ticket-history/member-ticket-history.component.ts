/**
 * MemberTicketHistoryComponent
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import * as moment from 'moment';
import { sleep } from '../../../../../functions';
import {
    CinerinoService,
    ReservationService,
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
    public reservations: {
        data: factory.ownershipInfo.IOwnershipInfo<factory.ownershipInfo.IGoodWithDetail>;
        theaterName: string;
    }[];
    public touch: boolean;

    constructor(
        private router: Router,
        private reservation: ReservationService,
        public user: UserService,
        private cinerinoService: CinerinoService
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
            const limit = 100;
            let page = 1;
            let roop = true;
            let result: factory.ownershipInfo.IOwnershipInfo<factory.ownershipInfo.IGoodWithDetail>[] =
                [];
            await this.cinerinoService.getServices();
            const sellers = await this.cinerinoService.seller.search({});
            while (roop) {
                const searchResult =
                    await this.cinerinoService.ownerShipInfo.search({
                        limit,
                        page,
                        typeOfGood: {
                            typeOf: factory.chevre.reservationType
                                .EventReservation,
                        },
                    });
                result = [...result, ...searchResult.data];
                page++;
                roop = searchResult.data.length === limit;
                if (roop) {
                    await sleep();
                }
            }
            const now = moment();
            this.reservations = result
                .filter((r) => {
                    return (
                        r.typeOfGood.typeOf ===
                            factory.chevre.reservationType.EventReservation &&
                        moment(r.typeOfGood.reservationFor.endDate).unix() <
                            now.unix()
                    );
                })
                .map((r) => {
                    const findResult = sellers.data.find((s) => {
                        return (
                            r.typeOfGood.typeOf ===
                                factory.chevre.reservationType
                                    .EventReservation &&
                            r.typeOfGood.reservationFor.coaInfo !== undefined &&
                            r.typeOfGood.reservationFor.coaInfo.theaterCode ===
                                s.branchCode
                        );
                    });
                    return {
                        data: r,
                        theaterName:
                            findResult === undefined
                                ? ''
                                : findResult.name === undefined
                                ? ''
                                : typeof findResult.name === 'string'
                                ? findResult.name
                                : findResult.name.ja === undefined
                                ? ''
                                : findResult.name.ja,
                    };
                });
        } catch (err) {
            this.router.navigate(['/error', { redirect: '/ticket' }]);
            console.log(err);
        }

        this.isLoading = false;
    }
}
