import { Injectable } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { IGmoTokenObject } from '.';
import { getProviderCredentials } from '../functions';
import { CinerinoService } from './cinerino.service';
import { ProductService } from './product.service';

@Injectable({
    providedIn: 'root',
})
export class GmoService {
    constructor(
        private cinerinoService: CinerinoService,
        private productService: ProductService
    ) {}

    /**
     * GMOトークン取得
     * @method getTokenObject
     */
    public async getTokenObject(sendParam: {
        cardno: string;
        expire: string;
        securitycode: string;
        holdername: string;
    }) {
        await this.cinerinoService.getServices();
        const branchCode = '';
        const searchResult = await this.cinerinoService.seller.search({});
        const sellerFindResult = searchResult.data.find(
            (s) =>
                s.location !== undefined && s.location.branchCode === branchCode
        );
        const seller =
            sellerFindResult === undefined
                ? searchResult.data[0]
                : sellerFindResult;

        const products = await this.productService.search({
            typeOf: {
                $eq: factory.service.paymentService.PaymentServiceType
                    .CreditCard,
            },
        });
        const paymentServices: factory.service.paymentService.IService[] = [];
        products.forEach((p) => {
            if (
                p.typeOf !==
                    factory.service.paymentService.PaymentServiceType
                        .CreditCard ||
                p.provider === undefined
            ) {
                return;
            }
            const findResult = p.provider.find(
                (provider) => provider.id === seller.id
            );
            if (findResult === undefined) {
                return;
            }
            paymentServices.push(p);
        });
        const paymentService = paymentServices[0];
        const providerCredentials = await getProviderCredentials({
            paymentService,
            seller,
        });

        return new Promise<IGmoTokenObject>((resolve, reject) => {
            (<any>window).someCallbackFunction = function someCallbackFunction(
                response: any
            ) {
                if (response.resultCode === '000') {
                    resolve(response.tokenObject);
                    return;
                }
                reject(new Error(response.resultCode));
            };
            if (
                providerCredentials === undefined ||
                providerCredentials.shopId === undefined
            ) {
                reject(new Error('shopId undefined'));
                return;
            }
            const Multipayment = (<any>window).Multipayment;
            Multipayment.init(providerCredentials.shopId);
            Multipayment.getToken(
                sendParam,
                (<any>window).someCallbackFunction
            );
        });
    }
}
