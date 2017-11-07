
/**
 * ReservationModelテスト
 */
import * as moment from 'moment';
import { ReservationModel } from './reservation.model';

describe('ReservationModel', () => {

    it('getReservationByPurchaseNumberOrder 正常 パフォーマンスあり', async () => {
        const data = {
            orders: [
                { acceptedOffers: [{ itemOffered: { reservationFor: { endDate: moment().add(1, 'hours').toISOString() } } }] },
                { acceptedOffers: [{ itemOffered: { reservationFor: { endDate: moment().add(1, 'hours').toISOString() } } }] },
                { acceptedOffers: [{ itemOffered: { reservationFor: { endDate: moment().add(-1, 'hours').toISOString() } } }] }
            ]
        };
        const length = new ReservationModel(data).getReservationByPurchaseNumberOrder().length;
        expect(length).toBe(2);
    });

    it('getReservationByPurchaseNumberOrder 正常 パフォーマンスなし', async () => {
        const data = {
            orders: [
                { acceptedOffers: [] }
            ]
        };
        const length = new ReservationModel(data).getReservationByPurchaseNumberOrder().length;
        expect(length).toBe(0);
    });

    it('convertToRecord 正常', async () => {
        const data = {
            orders: []
        };
        const record = new ReservationModel(data).convertToRecord();
        expect(record.reservationOwnerships).toBeDefined();
    });
});
