import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'rxjs/add/operator/toPromise';
import { UtilService } from './util.service';

export interface IInformationData {
    id: string;
    index: number;
    title: string;
    description: string;
    from: Date;
    through: Date;
    image: string;
    url: string;
    place: string[];
}

@Injectable({
    providedIn: 'root'
})
export class InformationService {
    private data: IInformationData[] = [];

    constructor(
        private utilService: UtilService
    ) { }

    /**
     * お知らせ取得
     */
    public async getInformation() {
        this.data = [];
        try {
            const url = `/storage/json/information.json?date=${moment().format('YYYYMMDDHHmm')}`;
            const json = await this.utilService.getJson<{ typeof: 'information'; data: IInformationData[]; }>(url);
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
        await this.getInformation();
        const now = (await this.utilService.getServerTime()).date;
        const filterResult = this.data.filter((data) => {
            return (moment(data.from).unix() < moment(now).unix()
                && moment(data.through).unix() > moment(now).unix()
                && data.place.find(p => p === place) !== undefined);
        });
        return filterResult;
    }

}
