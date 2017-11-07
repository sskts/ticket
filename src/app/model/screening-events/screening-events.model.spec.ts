
/**
 * ReservationModelテスト
 */
import * as moment from 'moment';
import { ScreeningEventsModel } from './screening-events.model';

describe('ScreeningEventsModel', () => {

    it('getEventByChronologicalOrder 正常', async () => {
        const data = {
            individualScreeningEvents: [
                { startDate: moment().add(1, 'hours').toISOString() },
                { startDate: moment().subtract(1, 'hours').toISOString() },
                { startDate: moment().toISOString() }
            ]
        };
        const chronologicalOrder = new ScreeningEventsModel(data).getEventByChronologicalOrder();
        expect(chronologicalOrder.length).toBe(1);
    });

    it('getEventByFilmOrder 正常', async () => {
        const data = {
            individualScreeningEvents: [
                { startDate: moment().add(1, 'hours').toISOString(), workPerformed: { identifier: '12345' } },
                { startDate: moment().add(1, 'hours').toISOString(), workPerformed: { identifier: '12345' } },
                { startDate: moment().subtract(1, 'hours').toISOString(), workPerformed: { identifier: '12345' } },
                { startDate: moment().toISOString(), workPerformed: { identifier: '12345' } }
            ]
        };
        const filmOrder = new ScreeningEventsModel(data).getEventByFilmOrder();
        expect(filmOrder.length).toBe(1);
        expect(filmOrder[0].films.length).toBe(2);
    });
});
