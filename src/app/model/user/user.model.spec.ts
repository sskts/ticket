
/**
 * ReservationModelテスト
 */
import * as moment from 'moment';
import { UserModel } from './user.model';

describe('UserModel', () => {

    it('convertToRecord 正常', async () => {
        const data = {};
        const record = new UserModel(data).convertToRecord();
        expect(record.select).toBeDefined();
        expect(record.select.purchase).toBeDefined();
        expect(record.select.purchase.date).toBeDefined();
        expect(record.select.purchase.theater).toBeDefined();
    });

    it('isFirst 正常 ユーザーデータあり', async () => {
        const data = {
            updateAt: moment().toISOString()
        };
        const isFirst = new UserModel(data).isFirst();
        expect(isFirst).toBeFalsy();
    });

    it('isFirst 正常 ユーザーデータなし', async () => {
        const data = {};
        const record = new UserModel(data).convertToRecord();
        const isFirst = new UserModel(data).isFirst();
        expect(isFirst).toBeTruthy();
    });
});
