import { Injectable } from '@angular/core';
import { getConfig, sleep } from '../../functions/util.function';
import { Base } from './base';

export namespace SellerType {
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
}

@Injectable({
    providedIn: 'root',
})
export class SellerService extends Base {
    /**
     * 検索
     */
    public async search(params: { exclude?: boolean; sort?: boolean }) {
        try {
            const limit = 100;
            let page = 1;
            let roop = true;
            let result: SellerType.ISeller[] = [];
            while (roop) {
                const url = `${this.endpoint}/projects/${this.projectId}/sellers`;
                const searchResult = await this.http
                    .get<SellerType.ISeller[]>(url, {
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
            let sellers = result;
            if (params.exclude !== undefined && params.exclude) {
                // 除外劇場処理
                const url = '/api/maintenance/excludeTheaters';
                const excludeResult = await this.utilService.getJson<{
                    isExclude: boolean;
                    theaters: string[];
                }>(url);
                if (excludeResult.isExclude) {
                    sellers = sellers.filter((s) => {
                        const excludeTheater = excludeResult.theaters.find(
                            (code) => {
                                return code === s.branchCode;
                            }
                        );
                        return excludeTheater === undefined;
                    });
                }
                sellers = sellers.filter((s) => {
                    const findResult = getConfig().closeTheaters.find(
                        (t) => t === s.branchCode
                    );
                    return findResult === undefined;
                });
            }
            if (params.sort !== undefined && params.sort) {
                // 並び順変更
                const url = '/json/table/theaters.json';
                const table = await this.utilService.getJson<
                    { code: string; name: string }[]
                >(url);
                sellers = sellers.sort((a, b) => {
                    const indexA = table.findIndex(
                        (t) => t.code === a.branchCode.slice(-2)
                    );
                    const indexB = table.findIndex(
                        (t) => t.code === b.branchCode.slice(-2)
                    );
                    if (indexA > indexB) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            }
            return sellers;
        } catch (error) {
            throw error;
        }
    }
}
