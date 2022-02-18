import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { sleep } from '../../functions/util.function';
import { Base } from './base';

export namespace OwnershipInfoType {
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
            paymentAccount: {
                balance: number;
            };
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
            reservationFor: IReservationFor;
            reservedTicket: IReservedTicket;
        };
    }

    export interface IReservationFor {
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
        coaInfo: {
            dateJouei: string;
        };
    }

    export interface IReservedTicket {
        ticketType: {
            identifier: string;
            name: {
                en: string;
                ja: string;
            };
        };
        ticketToken: string;
        coaTicketInfo: {
            salePrice: number;
            spseatKbn: string;
            spseatAdd2: number;
            ticketName: string;
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
        page?: number;
        limit?: number;
    }) {
        try {
            const limit = params.limit === undefined ? 100 : params.limit;
            let page = params.page === undefined ? 1 : params.page;
            let roop = true;
            let result: OwnershipInfoType.IMembership[] = [];
            while (roop) {
                const url = `${this.endpoint}/projects/${this.projectId}/people/me/ownershipInfos/MembershipService`;
                const httpParams = new HttpParams();
                httpParams.append('page', String(page));
                httpParams.append('limit', String(limit));
                if (params.ownedFrom !== undefined) {
                    httpParams.append(
                        'ownedFrom',
                        params.ownedFrom.toISOString()
                    );
                }
                if (params.ownedThrough !== undefined) {
                    httpParams.append(
                        'ownedThrough',
                        params.ownedThrough.toISOString()
                    );
                }
                const searchResult = await this.http
                    .get<OwnershipInfoType.IMembership[]>(url, {
                        params: httpParams,
                        headers: {
                            Authorization: `Bearer ${this.accessToken}`,
                        },
                    })
                    .toPromise();
                result = [...result, ...searchResult];
                page++;
                roop =
                    searchResult.length === limit && params.page === undefined;
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
        page?: number;
        limit?: number;
    }) {
        try {
            const limit = params.limit === undefined ? 100 : params.limit;
            let page = params.page === undefined ? 1 : params.page;
            let roop = true;
            let result: OwnershipInfoType.IPaymentCard[] = [];
            while (roop) {
                const url = `${this.endpoint}/projects/${this.projectId}/people/me/ownershipInfos/PaymentCard`;
                const httpParams = new HttpParams();
                httpParams.append('page', String(page));
                httpParams.append('limit', String(limit));
                if (params.ownedFrom !== undefined) {
                    httpParams.append(
                        'ownedFrom',
                        params.ownedFrom.toISOString()
                    );
                }
                if (params.ownedThrough !== undefined) {
                    httpParams.append(
                        'ownedThrough',
                        params.ownedThrough.toISOString()
                    );
                }
                const searchResult = await this.http
                    .get<OwnershipInfoType.IPaymentCard[]>(url, {
                        params: httpParams,
                        headers: {
                            Authorization: `Bearer ${this.accessToken}`,
                        },
                    })
                    .toPromise();
                result = [...result, ...searchResult];
                page++;
                roop =
                    searchResult.length === limit && params.page === undefined;
                if (roop) {
                    await sleep();
                }
            }
            const sortResult = result.sort((a, b) => {
                const unixA = moment(a.ownedFrom).unix();
                const unixB = moment(b.ownedFrom).unix();
                return unixA - unixB;
            });
            return sortResult;
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
        page?: number;
        limit?: number;
    }) {
        try {
            const limit = params.limit === undefined ? 100 : params.limit;
            let page = params.page === undefined ? 1 : params.page;
            let roop = true;
            let result: OwnershipInfoType.IEventService[] = [];
            while (roop) {
                const url = `${this.endpoint}/projects/${this.projectId}/people/me/ownershipInfos/EventService`;
                const httpParams = new HttpParams();
                httpParams.append('page', String(page));
                httpParams.append('limit', String(limit));
                if (params.ownedFrom !== undefined) {
                    httpParams.append(
                        'ownedFrom',
                        params.ownedFrom.toISOString()
                    );
                }
                if (params.ownedThrough !== undefined) {
                    httpParams.append(
                        'ownedThrough',
                        params.ownedThrough.toISOString()
                    );
                }
                const searchResult = await this.http
                    .get<OwnershipInfoType.IEventService[]>(url, {
                        params: httpParams,
                        headers: {
                            Authorization: `Bearer ${this.accessToken}`,
                        },
                    })
                    .toPromise();
                result = [...result, ...searchResult];
                page++;
                roop =
                    searchResult.length === limit && params.page === undefined;
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
        page?: number;
        limit?: number;
    }) {
        try {
            const limit = params.limit === undefined ? 100 : params.limit;
            let page = params.page === undefined ? 1 : params.page;
            let roop = true;
            let result: OwnershipInfoType.IMoneyTransferAction[] = [];
            while (roop) {
                const url = `${this.endpoint}/projects/${this.projectId}/people/me/ownershipInfos/PaymentCard/${params.ownershipInfoId}/actions/moneyTransfer`;
                const searchResult = await this.http
                    .get<OwnershipInfoType.IMoneyTransferAction[]>(url, {
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
                roop =
                    searchResult.length === limit && params.page === undefined;
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
     * 所有権削除
     */
    public async remove(params: { ownershipInfoId: string }) {
        try {
            const url = `${this.endpoint}/projects/${this.projectId}/people/me/ownershipInfos/${params.ownershipInfoId}`;
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
