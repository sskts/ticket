/**
 * ReservationModel
 */
import * as sasaki from '@motionpicture/sskts-api-javascript-client';

type IScreenEventReservation = sasaki.factory.reservation.event.IEventReservation<sasaki.factory.event.individualScreeningEvent.IEvent>;
type IReservationOwnership = sasaki.factory.ownershipInfo.IOwnershipInfo<IScreenEventReservation>;

export class ReservationModel {
    public reservationOwnerships: IReservationOwnership[];

    constructor (args: any) {
        if (args === undefined) {
            args = {};
        }
        this.reservationOwnerships = (args.reservationOwnerships === undefined) ? [] : args.reservationOwnerships;
    }

    /**
     * パフォーマンスごとの予約情報取得
     * @method getReservationByPerformance
     */
    public getReservationByPerformance() {
        const reservationsIdList: string[] = [];
        this.reservationOwnerships.forEach((reservationOwnership) => {
            const reservationsId = reservationOwnership.typeOfGood.reservationFor.identifier;
            if (reservationsIdList.indexOf(reservationsId) === -1) {
                reservationsIdList.push(reservationsId);
            }
        });
        const reservations = reservationsIdList.map((reservationsId) => {
            const reservationOwnerships = this.reservationOwnerships.filter((reservationOwnership) => {
                return (reservationOwnership.typeOfGood.reservationFor.identifier === reservationsId);
            });

            return {
                id: reservationsId,
                reservationFor: reservationOwnerships[0].typeOfGood.reservationFor,
                reservedTickets: reservationOwnerships.map((reservationOwnership) => {
                    return reservationOwnership.typeOfGood.reservedTicket;
                })
            };
        });
        console.log('reservations:', reservations);

        return reservations;
    }

    public convertToRecord() {
        return {
            reservationOwnerships : this.reservationOwnerships
        };
    }
}
