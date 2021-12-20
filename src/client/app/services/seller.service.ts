import { Injectable } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { getConfig } from '../functions/util.function';
import { CinerinoService } from './cinerino.service';
import { UtilService } from './util.service';

@Injectable({
    providedIn: 'root',
})
export class SellerService {
    constructor(
        private cinerinoService: CinerinoService,
        private utilService: UtilService
    ) {}

    /**
     * 販売者検索
     */
    public async search(
        params: factory.seller.ISearchConditions,
        oprions: { exclude: boolean; sort: boolean }
    ) {
        await this.cinerinoService.getServices();
        // let sellers: factory.chevre.seller.ISeller[] = [];
        const searchResult = await this.cinerinoService.seller.search(params);
        const filterResult = searchResult.data.filter((s) => {
            return (
                s.location !== undefined &&
                s.location.branchCode !== undefined &&
                s.location.branchCode !== '' &&
                getConfig().closeTheaters.find(
                    (t) => t === (<any>s.location).branchCode
                ) === undefined
            );
        });
        // 除外劇場処理
        const exclude = async (sellers: factory.chevre.seller.ISeller[]) => {
            const url = '/api/maintenance/excludeTheaters';
            const excludeTheatersResult = await this.utilService.getJson<{
                isExclude: boolean;
                theaters: string[];
            }>(url);
            if (!excludeTheatersResult.isExclude) {
                return sellers;
            }
            return sellers.filter((s) => {
                const excludeTheater = excludeTheatersResult.theaters.find(
                    (excludeCode) => {
                        return (
                            s.location === undefined ||
                            s.location.branchCode === undefined ||
                            excludeCode === s.location.branchCode
                        );
                    }
                );
                return excludeTheater === undefined;
            });
        };
        const excludeResult =
            oprions !== undefined && oprions.exclude
                ? await exclude(filterResult)
                : filterResult;
        // 並び順変更
        const sortSeller = async (sellers: factory.chevre.seller.ISeller[]) => {
            const url = '/json/table/theaters.json';
            const table = await this.utilService.getJson<
                { code: string; name: string }[]
            >(url);
            return sellers.sort((a, b) => {
                const indexA = table.findIndex(
                    (t) => t.code === (<any>a).location.branchCode.slice(-2)
                );
                const indexB = table.findIndex(
                    (t) => t.code === (<any>b).location.branchCode.slice(-2)
                );
                if (indexA > indexB) {
                    return 1;
                } else {
                    return -1;
                }
            });
        };
        const sortResult =
            oprions !== undefined && oprions.sort
                ? await sortSeller(excludeResult)
                : excludeResult;
        return sortResult;
    }
}
