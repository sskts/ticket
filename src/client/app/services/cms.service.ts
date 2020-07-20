import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'rxjs/add/operator/toPromise';
import { cms } from '../models';
import { UtilService } from './util.service';

@Injectable({
    providedIn: 'root'
})
export class CmsService {
    public apiEndpoint?: string;

    constructor(
        private http: HttpClient,
        private utilService: UtilService
    ) { }

    private async setEndpoint() {
        if (this.apiEndpoint === undefined) {
            this.apiEndpoint = (await this.utilService.getJson<{
                scheduleApiEndpoint: string;
                cmsApiEndpoint: string;
            }>(`/api/config?date${moment().toISOString()}`)).cmsApiEndpoint;
        }
    }

    /**
     * 上映情報一覧取得
     */
    public async getSchedule(params: {
        scheduleType: 'nowShowing' | 'comingSoon';
        theaterCode?: string;
    }) {
        await this.setEndpoint();
        const scheduleType = (params.scheduleType === 'nowShowing')
            ? 'now-showing' : 'coming-soon';
        const url = `${this.apiEndpoint}/schedules/${scheduleType}`;
        const options = {
            params: (params.theaterCode === undefined) ? undefined : { theater: params.theaterCode }
        };
        const result = await this.http.get<{ schedules: cms.schedule.ISchedule[] }>(url, options).toPromise();
        return result;
    }
}
