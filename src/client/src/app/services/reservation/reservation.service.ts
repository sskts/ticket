/**
 * ReservationService
 */
import { Injectable } from '@angular/core';
import { factory } from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';
import { AwsCognitoService } from '../aws-cognito/aws-cognito.service';
import { SasakiService } from '../sasaki/sasaki.service';
import { StorageService } from '../storage/storage.service';
type ITicket = factory.reservation.ITicket<factory.reservation.event.IPriceSpecification>;
type IReservationFor = factory.reservation.event.IReservationFor;

export interface IReservation {
    confirmationNumber: string;
    reservationsFor: IReservationFor[];
    reservedTickets: ITicket[];
}

export interface IReservationData {
    reservations: IReservation[];
    expired: number;
}

@Injectable()
export class ReservationService {
    public data: IReservationData;
    public isMember: boolean;

    constructor(
        private awsCognito: AwsCognitoService,
        private storage: StorageService,
        private sasaki: SasakiService
    ) { }

    /**
     * 予約情報取得
     * @method getReservation
     * @returns {Promise<void>}
     */
    private async getReservation(): Promise<void> {
        const reservation: IReservationData = (this.data === undefined)
            ? this.storage.load('reservation')
            : this.data;
        if (reservation === undefined
            || reservation === null
            || reservation.expired < moment().unix()) {
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
            orders: factory.order.IOrder[]
        } = await this.awsCognito.getRecords({
            datasetName: 'reservation'
        });
        const expired = 10;

        const orders: IReservation[] = [];
        if (Array.isArray(reservationRecord.orders)) {
            reservationRecord.orders.forEach((order) => {
                const reservationsFor: IReservationFor[] = [];
                order.acceptedOffers.forEach((offer) => {
                    if (offer.itemOffered.typeOf !== factory.reservationType.EventReservation) {
                        return;
                    }
                    reservationsFor.push(offer.itemOffered.reservationFor);
                });
                const reservedTickets: ITicket[] = [];
                order.acceptedOffers.forEach((offer) => {
                    if (offer.itemOffered.typeOf !== factory.reservationType.EventReservation) {
                        return;
                    }
                    reservedTickets.push(offer.itemOffered.reservedTicket);
                });
                orders.push({
                    confirmationNumber: String(order.confirmationNumber),
                    reservationsFor: reservationsFor,
                    reservedTickets: reservedTickets
                });
            });
        }

        return {
            reservations: orders,
            expired: moment().add(expired, 'milliseconds').unix()
        };
    }

    /**
     * 予約をAPI経由で取得
     * @method fitchReservation
     * @returns {Promise<IReservationData>}
     */
    private async fitchReservation(): Promise<IReservationData> {
        await this.sasaki.getServices();
        const reservationOwnerships = await this.sasaki.ownerShip.search<factory.reservationType.EventReservation>({
            id: 'me',
            typeOfGood: {
                typeOf: factory.reservationType.EventReservation
            }
        });
        console.log(reservationOwnerships);
        const orders: IReservation[] = [];
        for (const reservationOwnership of reservationOwnerships.data) {
            const confirmationNumber = reservationOwnership.typeOfGood.reservationNumber.split('-')[0];
            const reservationFor = reservationOwnership.typeOfGood.reservationFor;
            const reservedTicket = reservationOwnership.typeOfGood.reservedTicket;
            const target = orders.find((order) => {
                return (order.confirmationNumber === confirmationNumber);
            });
            if (target === undefined) {
                const reservation: IReservation = {
                    confirmationNumber: confirmationNumber,
                    reservationsFor: [],
                    reservedTickets: []
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
            expired: moment().add(expired, 'milliseconds').unix()
        };
    }

    /**
     * パフォーマンスごとの予約情報取得（購入番号順）
     * @method getReservationByPurchaseNumber
     */
    public async getReservationByPurchaseNumberOrder(): Promise<IReservation[]> {
        await this.getReservation();

        return this.data.reservations.filter((reservation) => {
            if (reservation.reservedTickets.length === 0) {
                return false;
            }
            const endDate = moment(reservation.reservationsFor[0].endDate);

            return (endDate.unix() > moment().unix());
        });
    }

    /**
     * パフォーマンスごとの予約情報取得（鑑賞日順）
     * @method getReservationByAppreciationDayOrder
     */
    public async getReservationByAppreciationDayOrder(): Promise<IReservation[]> {
        await this.getReservation();
        const order = this.data.reservations.filter((reservation) => {
            if (reservation.reservedTickets.length === 0) {
                return false;
            }
            const endDate = moment(reservation.reservationsFor[0].endDate);

            return (endDate.unix() > moment().unix());
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
