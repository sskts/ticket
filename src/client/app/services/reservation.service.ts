/**
 * ReservationService
 */
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { AwsCognitoService } from './aws-cognito.service';
import {
    OwnershipInfoType,
    SmartTheaterService,
} from './smart-theater.service';
import { StorageService } from './storage.service';

export interface IReservation {
    confirmationNumber: string;
    reservationsFor: OwnershipInfoType.IReservationFor[];
    reservedTickets: OwnershipInfoType.IReservedTicket[];
}

export interface IReservationData {
    reservations: IReservation[];
    expired: number;
}

@Injectable({
    providedIn: 'root',
})
export class ReservationService {
    public data: IReservationData;
    public isMember: boolean;

    constructor(
        private awsCognito: AwsCognitoService,
        private storage: StorageService,
        private smartTheaterService: SmartTheaterService
    ) {}

    /**
     * 予約情報取得
     * @method getReservation
     * @returns {Promise<void>}
     */
    private async getReservation(): Promise<void> {
        const reservation: IReservationData =
            this.data === undefined
                ? this.storage.load('reservation')
                : this.data;
        if (
            reservation === undefined ||
            reservation === null ||
            reservation.expired < moment().unix()
        ) {
            try {
                if (this.isMember) {
                    // 会員
                    this.data = await this.fitchReservation();
                } else {
                    // 非会員
                    this.data = await this.fitchReservationCognito();
                }

                this.storage.save('reservation', this.data);
            } catch (err) {
                this.storage.remove('reservation');
                throw err;
            }
        } else {
            this.data = reservation;
        }
    }

    /**
     * 予約をCognito経由で取得
     * @method fitchReservation
     * @returns {Promise<IReservationData>}
     */
    private async fitchReservationCognito(): Promise<IReservationData> {
        const reservationRecord: {
            orders: {
                acceptedOffers?: {
                    itemOffered: {
                        typeOf: string;
                        reservationNumber: string;
                        reservationFor: OwnershipInfoType.IReservationFor;
                        reservedTicket: OwnershipInfoType.IReservedTicket;
                    };
                }[];
            }[];
        } = await this.awsCognito.getRecords({
            datasetName: 'reservation',
        });
        const expired = 10;

        const orders: IReservation[] = [];
        if (Array.isArray(reservationRecord.orders)) {
            reservationRecord.orders.forEach((order) => {
                if (order.acceptedOffers === undefined) {
                    return;
                }
                const reservationsFor: OwnershipInfoType.IReservationFor[] = [];
                const reservedTickets: OwnershipInfoType.IReservedTicket[] = [];
                order.acceptedOffers.forEach((o) => {
                    if (o.itemOffered.typeOf !== 'EventReservation') {
                        return;
                    }
                    const itemOffered = o.itemOffered;

                    reservationsFor.push({
                        ...itemOffered.reservationFor,
                        startDate: moment(
                            itemOffered.reservationFor.startDate
                        ).toISOString(),
                        endDate: moment(
                            itemOffered.reservationFor.endDate
                        ).toISOString(),
                    });
                    reservedTickets.push(itemOffered.reservedTicket);
                });

                if (
                    order.acceptedOffers[0].itemOffered.typeOf !==
                    'EventReservation'
                ) {
                    return;
                }
                const confirmationNumber =
                    order.acceptedOffers[0].itemOffered.reservationNumber;
                orders.push({
                    confirmationNumber,
                    reservationsFor: reservationsFor,
                    reservedTickets: reservedTickets,
                });
            });
        }

        return {
            reservations: orders,
            expired: moment().add(expired, 'second').unix(),
        };
    }

    /**
     * 予約をAPI経由で取得
     * @method fitchReservation
     * @returns {Promise<IReservationData>}
     */
    private async fitchReservation(): Promise<IReservationData> {
        await this.smartTheaterService.getServices();
        const eventReservations =
            await this.smartTheaterService.ownershipInfo.searchEventService({});

        const orders: IReservation[] = [];
        for (const eventReservation of eventReservations) {
            const confirmationNumber =
                eventReservation.typeOfGood.reservationNumber.split('-')[0];
            const reservationFor = eventReservation.typeOfGood.reservationFor;
            const reservedTicket = eventReservation.typeOfGood.reservedTicket;
            const target = orders.find((order) => {
                return order.confirmationNumber === confirmationNumber;
            });
            if (target === undefined) {
                const reservation: IReservation = {
                    confirmationNumber: confirmationNumber,
                    reservationsFor: [],
                    reservedTickets: [],
                };
                reservation.reservationsFor.push(reservationFor);
                reservation.reservedTickets.push(reservedTicket);
                orders.push(reservation);
            } else {
                target.reservationsFor.push(reservationFor);
                target.reservedTickets.push(reservedTicket);
            }
        }
        const expired = 10;

        return {
            reservations: orders,
            expired: moment().add(expired, 'second').unix(),
        };
    }

    /**
     * パフォーマンスごとの予約情報取得（購入番号順）
     * @method getReservationByPurchaseNumber
     */
    public async getReservationByPurchaseNumberOrder(): Promise<
        IReservation[]
    > {
        await this.getReservation();

        return this.data.reservations.filter((reservation) => {
            if (reservation.reservedTickets.length === 0) {
                return false;
            }
            const endDate = moment(reservation.reservationsFor[0].endDate);

            return endDate.unix() > moment().unix();
        });
    }

    /**
     * パフォーマンスごとの予約情報取得（鑑賞日順）
     * @method getReservationByAppreciationDayOrder
     */
    public async getReservationByAppreciationDayOrder(): Promise<
        IReservation[]
    > {
        await this.getReservation();
        const order = this.data.reservations.filter((reservation) => {
            if (reservation.reservedTickets.length === 0) {
                return false;
            }
            const endDate = moment(reservation.reservationsFor[0].endDate);
            // 上映終了12時間後まで表示
            return endDate.unix() > moment().add(-12, 'hour').unix();
        });

        order.sort((a, b) => {
            const startDateA = moment(a.reservationsFor[0].startDate).unix();
            const startDateB = moment(b.reservationsFor[0].startDate).unix();
            if (startDateA < startDateB) {
                return -1;
            } else if (startDateA > startDateB) {
                return 1;
            } else {
                return 0;
            }
        });

        return order;
    }
}
