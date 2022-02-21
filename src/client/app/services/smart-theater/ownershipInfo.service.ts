import { Injectable } from '@angular/core';
import { sleep } from '../../functions/util.function';
import { Base } from './base';

export interface IMembership {
    id: string;
    ownedFrom: string;
    ownedThrough: string;
    typeOfGood: {
        identifier: string;
    };
}

export interface IPaymentCard {
    id: string;
    ownedFrom: string;
    ownedThrough: string;
    typeOfGood: {
        identifier: string;
    };
}

export interface IEventService {
    id: string;
    ownedFrom: string;
    ownedThrough: string;
    typeOfGood: {
        id: string;
        reservationNumber: string;
        bookingTime: string;
        reservationFor: {
            id: string;
            startDate: string;
            endDate: string;
            name: {
                en: string;
                ja: string;
            };
            location: {
                branchCode: string;
                name: {
                    en: string;
                    ja: string;
                };
            };
            superEvent: {
                kanaName: string;
                name: {
                    en: string;
                    ja: string;
                };
                location: {
                    branchCode: string;
                    name: {
                        en: string;
                        ja: string;
                    };
                };
                workPerformed: {
                    identifier: string;
                    name: string;
                };
            };
        };
        reservedTicket: {
            ticketType: {
                identifier: string;
                name: {
                    en: string;
                    ja: string;
                };
            };
        };
    };
}

export interface IMoneyTransferAction {
    amount: {
        currency: string;
        value: number;
    };
    description: string;
    purpose: {
        typeOf: string;
    };
    startDate: string;
}

@Injectable({
    providedIn: 'root',
})
export class OwnershipInfoService extends Base {
    /**
     * マイメンバーシップ検索
     */
    public async searchMemberships(params: {
        ownedFrom?: Date;
        ownedThrough?: Date;
    }) {
        try {
            const limit = 100;
            let page = 1;
            let roop = true;
            let result: IMembership[] = [];
            while (roop) {
                const url = `${this.endpoint}/projects/${this.projectId}/people/me/ownershipInfos/MembershipService`;
                const searchResult = await this.http
                    .get<IMembership[]>(url, {
                        params: {
                            page: String(page),
                            limit: String(limit),
                            ownedFrom:
                                params.ownedFrom === undefined
                                    ? ''
                                    : params.ownedFrom.toISOString(),
                            ownedThrough:
                                params.ownedThrough === undefined
                                    ? ''
                                    : params.ownedThrough.toISOString(),
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
     * マイポイントカード検索
     */
    public async searchPaymentCard(params: {
        ownedFrom?: Date;
        ownedThrough?: Date;
    }) {
        try {
            const limit = 100;
            let page = 1;
            let roop = true;
            let result: IPaymentCard[] = [];
            while (roop) {
                const url = `${this.endpoint}/projects/${this.projectId}/people/me/ownershipInfos/PaymentCard`;
                const searchResult = await this.http
                    .get<IPaymentCard[]>(url, {
                        params: {
                            page: String(page),
                            limit: String(limit),
                            ownedFrom:
                                params.ownedFrom === undefined
                                    ? ''
                                    : params.ownedFrom.toISOString(),
                            ownedThrough:
                                params.ownedThrough === undefined
                                    ? ''
                                    : params.ownedThrough.toISOString(),
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
     * マイ予約検索
     */
    public async searchEventService(params: {
        ownedFrom?: Date;
        ownedThrough?: Date;
    }) {
        try {
            const limit = 100;
            let page = 1;
            let roop = true;
            let result: IEventService[] = [];
            while (roop) {
                const url = `${this.endpoint}/projects/${this.projectId}/people/me/ownershipInfos/EventService`;
                const searchResult = await this.http
                    .get<IEventService[]>(url, {
                        params: {
                            page: String(page),
                            limit: String(limit),
                            ownedFrom:
                                params.ownedFrom === undefined
                                    ? ''
                                    : params.ownedFrom.toISOString(),
                            ownedThrough:
                                params.ownedThrough === undefined
                                    ? ''
                                    : params.ownedThrough.toISOString(),
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
     * ペイメントカード入出金検索
     */
    public async searchMoneyTransferActions(params: {
        ownershipInfoId: string;
    }) {
        try {
            const limit = 100;
            let page = 1;
            let roop = true;
            let result: IMoneyTransferAction[] = [];
            while (roop) {
                const url = `${this.endpoint}/projects/${this.projectId}/people//me/ownershipInfos/PaymentCard/${params.ownershipInfoId}/actions/moneyTransfer`;
                const searchResult = await this.http
                    .get<IMoneyTransferAction[]>(url, {
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
