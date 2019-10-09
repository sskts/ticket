import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor(private http: HttpClient) { }

    /**
     * スリープ
     */
    public async sleep(time: number) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    }

    /**
     * サーバータイム取得
     */
    public async getServerTime() {
        const result = await this.http.get<{ date: string }>(`/api/serverTime?date=${moment().toISOString()}`).toPromise();

        return result;
    }

}
