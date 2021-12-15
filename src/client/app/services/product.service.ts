import { Injectable } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { sleep } from '../functions/util.function';
import { CinerinoService } from './cinerino.service';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(private cinerinoService: CinerinoService) {}

    /**
     * プロダクト検索
     */
    public async search(params: factory.product.ISearchConditions) {
        try {
            const limit = 100;
            let page = 1;
            let roop = true;
            let result: (
                | factory.product.IProduct
                | factory.service.paymentService.IService
            )[] = [];
            await this.cinerinoService.getServices();
            while (roop) {
                const searchResult = await this.cinerinoService.product.search({
                    page,
                    limit,
                    ...params,
                });
                result = [...result, ...searchResult.data];
                page++;
                roop = searchResult.data.length === limit;
                if (roop) {
                    await sleep(500);
                }
            }
            return result;
        } catch (error) {
            throw error;
        }
    }
}
