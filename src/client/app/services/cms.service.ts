import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { sleep } from '../functions';
import { cms } from '../models';

@Injectable({
    providedIn: 'root'
})
export class CmsService {

    constructor(
        private http: HttpClient
    ) { }

    /**
     * 上映情報一覧取得
     */
    public async getSchedule(params: {
        scheduleType: 'nowShowing' | 'comingSoon';
        theaterCode?: string;
    }) {
        await sleep(1000);
        const scheduleType = (params.scheduleType === 'nowShowing')
            ? 'now-showing' : 'coming-soon';
        const url = `/json/cms/schedule/${scheduleType}.json`;
        const options = {
            params: (params.theaterCode === undefined) ? undefined : { theater: params.theaterCode }
        };
        const result = await this.http.get<{ schedules: cms.schedule.ISchedule[] }>(url, options).toPromise();
        return result;
    }
}
