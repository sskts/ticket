import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'rxjs/add/operator/toPromise';
import { UtilService } from './util.service';

interface IData {
    index: number;
    title: string;
    from: Date;
    through: Date;
    image: string;
    url: string;
    place: string[];
}

@Injectable({
    providedIn: 'root'
})
export class CampaignService {
    private data: IData[] = [];

    constructor(
        private utilService: UtilService
    ) { }

    /**
     * キャンペンデータ取得
     */
    public async getCampaign() {
        this.data = [];
        try {
            const url = `/storage/json/campaign.json?date=${moment().format('YYYYMMDDHHmm')}`;
            const json = await this.utilService.getJson<{ typeof: 'campaign'; data: IData[]; }>(url);
            this.data = json.data.sort((a, b) => {
                if (a.index > b.index) {
                    return 1;
                  } else {
                    return -1;
                  }
            });
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * 有効なデータ取得
     */
    public async getAvailabilityData(place: string) {
        await this.getCampaign();
        const now = (await this.utilService.getServerTime()).date;
        const filterResult = this.data.filter((data) => {
            return (moment(data.from).unix() < moment(now).unix()
                && moment(data.through).unix() > moment(now).unix()
                && data.place.find(p => p === place) !== undefined);
        });
        return filterResult;
    }

}
