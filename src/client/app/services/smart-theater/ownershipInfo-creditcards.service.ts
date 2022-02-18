import { Injectable } from '@angular/core';
import { sleep } from '../../functions/util.function';
import { Base } from './base';

export namespace OwnershipInfoCreditCardsType {
    export interface ICreditCard {
        cardSeq: string;
        cardName: string;
        cardNo: string;
        expire: string;
        holderName: string;
    }
}

@Injectable({
    providedIn: 'root',
})
export class OwnershipInfoCreditCardsService extends Base {
    /**
     * クレジットカード追加
     */
    public async add(params: { token: string }) {
        try {
            const url = `${this.endpoint}/projects/${this.projectId}/people/me/ownershipInfos/creditCards`;
            await this.http
                .post<void>(url, params, {
                    headers: {
                        Authorization: `Bearer ${this.accessToken}`,
                    },
                })
                .toPromise();
        } catch (error) {
            throw error;
        }
    }

    /**
     * クレジットカード検索
     */
    public async search() {
        try {
            const limit = 100;
            let page = 1;
            let roop = true;
            let result: OwnershipInfoCreditCardsType.ICreditCard[] = [];
            while (roop) {
                const url = `${this.endpoint}/projects/${this.projectId}/people/me/ownershipInfos/creditCards`;
                const searchResult = await this.http
                    .get<OwnershipInfoCreditCardsType.ICreditCard[]>(url, {
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

    /**
     * クレジットカード削除
     */
    public async remove(params: { cardSeq: string }) {
        try {
            const url = `${this.endpoint}/projects/${this.projectId}/people/me/ownershipInfos/creditCards/${params.cardSeq}`;
            await this.http
                .delete<void>(url, {
                    headers: {
                        Authorization: `Bearer ${this.accessToken}`,
                    },
                })
                .toPromise();
        } catch (error) {
            throw error;
        }
    }
}
