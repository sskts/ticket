/**
 * ReservationModel
 */
import * as sasaki from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';

export class ReservationModel {
    public orders: sasaki.factory.order.IOrder[];

    constructor(args?: any) {
        if (args === undefined) {
            args = {};
        }
        this.orders = (args.orders === undefined) ? [] : args.orders;
    }

    /**
     * パフォーマンスごとの予約情報取得
     * @method getReservationByPurchaseNumber
     */
    public getReservationByPurchaseNumberOrder(): sasaki.factory.order.IOrder[] {
        return this.orders.filter((order) => {
            if (order.acceptedOffers.length === 0) {
                return false;
            }
            const endDate = moment(order.acceptedOffers[0].itemOffered.reservationFor.endDate);

            return (endDate.unix() > moment().unix());
        });
    }

    public convertToRecord() {
        return {
            reservationOwnerships: this.orders
        };
    }
}
