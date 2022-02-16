import { Injectable } from '@angular/core';
import { sleep } from '../../functions/util.function';
import { Base } from './base';

export interface ISeller {
    additionalProperty: {
        name: string;
        value: string;
    }[];
    branchCode: string;
    id: string;
    name: {
        en: string;
        ja: string;
    };
}

@Injectable({
    providedIn: 'root',
})
export class SellerService extends Base {
    /**
     * 検索
     */
    public async search() {
        try {
            const limit = 100;
            let page = 1;
            let roop = true;
            let result: ISeller[] = [];
            while (roop) {
                const url = `${this.endpoint}/projects/${this.projectId}/sellers`;
                const searchResult = await this.http
                    .get<ISeller[]>(url, {
                        params: {
                            page: String(page),
                            limit: String(limit),
                        },
                        headers: {
                            Authorization: `Bearer ${this.accessToken}`,
                        },
                    })
                    .toPromise();
                result = [...result, ...searchResult];
                page++;
                roop = searchResult.length === limit;
                if (roop) {
                    await sleep();
                }
            }
            return result;
        } catch (error) {
            throw error;
        }
    }
}
