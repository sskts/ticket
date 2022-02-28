import { Injectable } from '@angular/core';
import { IGmoTokenObject } from '.';
import { SmartTheaterService } from './smart-theater.service';

@Injectable({
    providedIn: 'root',
})
export class GmoService {
    constructor(private smartTheaterService: SmartTheaterService) {}

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
        return new Promise<IGmoTokenObject>(async (resolve, reject) => {
            try {
                await this.smartTheaterService.getServices();
                const sellers = await this.smartTheaterService.seller.search(
                    {}
                );
                const seller = sellers.find((s) => {
                    const property = s.additionalProperty.find(
                        (a) => a.name === 'shopId'
                    );
                    return property !== undefined;
                });
                if (seller === undefined) {
                    throw new Error('seller undefined');
                }
                const additionalProperty = seller.additionalProperty.find(
                    (a) => a.name === 'shopId'
                );
                if (additionalProperty === undefined) {
                    throw new Error('shopId undefined');
                }
                const shopId = additionalProperty.value;
                (<any>window).someCallbackFunction =
                    function someCallbackFunction(response: any) {
                        if (response.resultCode === '000') {
                            resolve(response.tokenObject);
                            return;
                        }
                        throw new Error(response.resultCode);
                    };
                const Multipayment = (<any>window).Multipayment;
                Multipayment.init(shopId);
                Multipayment.getToken(
                    sendParam,
                    (<any>window).someCallbackFunction
                );
            } catch (error) {
                reject(error);
            }
        });
    }
}
