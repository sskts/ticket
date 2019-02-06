/**
 * PurchaseComponent
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import { AwsCognitoService } from '../../../services/aws-cognito/aws-cognito.service';
import { IConfirm, MaintenanceService } from '../../../services/maintenance/maintenance.service';
import { SasakiService } from '../../../services/sasaki/sasaki.service';
import { IPurchaseConditions, PurchaseSort, SelectService } from '../../../services/select/select.service';
import { MemberType, UserService } from '../../../services/user/user.service';
import { IEventWithOffer } from '@motionpicture/sskts-factory/lib/factory/event/individualScreeningEvent';

type IMovieTheater = factory.organization.movieTheater.IOrganizationWithoutGMOInfo;
type IIndividualScreeningEvent = factory.event.individualScreeningEvent.IEventWithOffer;
type ITimeOrder = IIndividualScreeningEvent;

interface IFilmOrder {
    id: string;
    films: IIndividualScreeningEvent[];
}

interface IDate {
    value: string;
    display: {
        year: string;
        month: string;
        week: string;
        day: string;
    };
    preSale: boolean;
    serviceDay: string;
}

@Component({
    selector: 'app-purchase',
    templateUrl: './purchase.component.html',
    styleUrls: ['./purchase.component.scss']
})
/**
 * チケット購入
 * @class PurchaseComponent
 * @implements OnInit
 */
export class PurchaseComponent implements OnInit {
    public isLoading: boolean;
    public theaters: IMovieTheater[];
    public dateList: IDate[];
    public filmOrder: IFilmOrder[];
    public timeOrder: ITimeOrder[];
    public screeningEvents: IIndividualScreeningEvent[];
    public conditions: IPurchaseConditions;
    public error: string;
    public purchaseSort: typeof PurchaseSort;
    public isPreSale: boolean;
    public maintenanceInfo: IConfirm;

    constructor(
        private router: Router,
        private sasaki: SasakiService,
        private select: SelectService,
        private user: UserService,
        private maintenance: MaintenanceService,
        private awsCognito: AwsCognitoService
    ) {
        this.purchaseSort = PurchaseSort;
    }

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        this.isLoading = true;
        try {
            this.maintenanceInfo = await this.maintenance.confirm();
            if (this.maintenanceInfo.isMaintenance) {
                this.isLoading = false;

                return;
            }
            this.conditions = this.select.data.purchase;
            if (this.user.isMember() && this.conditions.theater === '') {
                // 会員
                this.conditions.theater = this.user.getTheaterCode(0);
            }
            await this.initialize();
            localStorage.removeItem('schedule');
        } catch (error) {
            this.router.navigate(['/error', { redirect: '/purchase' }]);
            console.error('PurchaseComponent.ngOnInit', error);
        }

        this.isLoading = false;
    }

    /**
     * 初期化
     */
    private async initialize() {
        this.theaters = [];
        this.dateList = [];
        this.filmOrder = [];
        this.timeOrder = [];
        this.theaters = await this.getTheaters();
        const findResult = this.theaters.find(theater => theater.location.branchCode === this.conditions.theater);
        if (findResult === undefined) {
            this.conditions.theater = '';
        }
        if (this.conditions.theater !== '') {
            this.screeningEvents = await this.getScreeningEvents();
            this.createDateList();
            this.createSchedule();
        }
    }

    /**
     * 劇場変更
     */
    public async changeTheater() {
        this.isLoading = true;
        this.select.data.purchase.theater = this.conditions.theater;
        this.select.save();
        try {
            await this.sasaki.getServices();
            this.screeningEvents = await this.getScreeningEvents();
            this.createDateList();
            this.createSchedule();
        } catch (error) {
            this.router.navigate(['/error', { redirect: '/purchase' }]);
            console.error('PurchaseComponent.changeTheater', error);
        }
        this.isLoading = false;
    }

    /**
     * ソート変更
     * @method changeSort
     */
    public async changeSort(sort: PurchaseSort) {
        this.select.data.purchase.sort = sort;
        this.select.save();
    }

    /**
     * 日付選択
     * @method selectDate
     */
    public async selectDate(date: IDate) {
        this.conditions.date = date.value;
        this.select.data.purchase.date = this.conditions.date;
        this.select.save();
        this.createSchedule();
    }

    /**
     * スケジュール更新
     */
    public async update() {
        this.isLoading = true;
        try {
            await this.initialize();
        } catch (error) {
            this.router.navigate(['/error', { redirect: '/purchase' }]);
            console.error('PurchaseComponent.update', error);
        }
        this.isLoading = false;
    }

    /**
     * パフォーマンス選択
     * @method performanceSelect
     */
    public async performanceSelect(performance: IIndividualScreeningEvent) {
        if (performance.offer.availability === 0) {
            return;
        }
        let params;
        if (this.user.isMember()) {
            params = {
                id: performance.identifier,
                native: '1',
                member: MemberType.Member,
                clientId: this.sasaki.auth.options.clientId
            };
        } else {
            if (this.awsCognito.credentials === undefined) {
                throw new Error('awsCognito.credentials is undefined');
            }
            params = {
                id: performance.identifier,
                identityId: this.awsCognito.credentials.identityId,
                native: '1',
                member: MemberType.NotMember,
                clientId: this.sasaki.auth.options.clientId
            };
        }
        let query = '';
        for (let i = 0; i < Object.keys(params).length; i++) {
            const key = Object.keys(params)[i];
            const value = (<any>params)[key];
            if (i > 0) {
                query += '&';
            }
            query += `${key}=${value}`;
        }
        const url = `${environment.ENTRANCE_SERVER_URL}/ticket/index.html?${query}`;
        location.href = url;
    }

    /**
     * 劇場一覧取得
     */
    private async getTheaters() {
        await this.sasaki.getServices();
        const theaters = await this.sasaki.organization.searchMovieTheaters();
        // 除外劇場処理
        const excludeTheatersResult = await this.maintenance.excludeTheaters();
        if (!excludeTheatersResult.isExclude) {
            return theaters;
        }

        return theaters.filter((theater) => {
            const excludeTheater = excludeTheatersResult.theaters.find((excludeCode) => {
                return (excludeCode === theater.location.branchCode);
            });

            return (excludeTheater === undefined);
        });
    }

    /**
     * スケジュール取得
     */
    private async getScreeningEvents() {
        await this.sasaki.getServices();
        const branchCode = this.conditions.theater;
        const findResult = this.theaters.find(theater => theater.location.branchCode === branchCode);
        if (findResult === undefined) {
            return [];
        }
        const screeningEvents = await this.sasaki.event.searchIndividualScreeningEvent({
            eventStatuses: [factory.eventStatusType.EventScheduled],
            startFrom: moment().toDate(),
            startThrough: moment().add(5, 'week').toDate(),
            superEventLocationIdentifiers: [findResult.identifier]
        });

        return screeningEvents;
    }

    /**
     * 先行販売かどうかをチェックする
     */
    private checkEventPreSale(event : IEventWithOffer): boolean {
        const salesDate = moment().add(2, 'days').format('YYYYMMDD');
        const startDate = moment(event.startDate).format('YYYYMMDD');
        const today = moment().format('YYYYMMDD');
        const PRE_SALE = '1'; // 先行販売
        return event.coaInfo.rsvStartDate <= today &&
            event.coaInfo.flgEarlyBooking === PRE_SALE && 
            salesDate < startDate;
    }

    /**
     * 日付作成
     */
    private createDateList() {
        const result: IDate[] = [];
        const limitDate = moment().add(7, 'days').format('YYYYMMDD');
        const today = moment().format('YYYYMMDD');
        this.screeningEvents.forEach((screeningEvent) => {
            const startDate = moment(screeningEvent.startDate).format('YYYYMMDD');
            const isSalse = screeningEvent.coaInfo.rsvStartDate <= today;
            if (!isSalse && startDate >= limitDate) {
                return;
            }
            const findResult = result.find((date) => screeningEvent.coaInfo.dateJouei === date.value);
            if (findResult === undefined) {
                const date = moment(screeningEvent.coaInfo.dateJouei);
                result.push({
                    value: screeningEvent.coaInfo.dateJouei,
                    display: {
                        month: date.format('MM'),
                        week: date.format('ddd'),
                        day: date.format('DD'),
                        year: date.format('YYYY')
                    },
                    preSale: this.checkEventPreSale(screeningEvent),
                    serviceDay: screeningEvent.coaInfo.nameServiceDay
                });
            } else if(this.checkEventPreSale(screeningEvent)) {
                findResult.preSale = true;
            }
        });
        this.dateList = result;
        this.isPreSale = (this.dateList.find(date => date.preSale) !== undefined);
    }

    /**
     * スケジュール作成
     */
    private createSchedule() {
        this.filmOrder = [];
        this.timeOrder = [];
        const today = moment().format('YYYYMMDD');
        const limitDate = moment().add(7, 'days').format('YYYYMMDD');
        const dateFilterResult = this.screeningEvents
            .filter(screeningEvent => screeningEvent.coaInfo.dateJouei === this.conditions.date);

        const displayFilterResult = dateFilterResult
            .filter(screeningEvent => (screeningEvent.coaInfo.rsvStartDate <= today
                || this.checkEventPreSale(screeningEvent)
                || screeningEvent.coaInfo.dateJouei <= limitDate));

        this.timeOrder = displayFilterResult;
        displayFilterResult.forEach((screeningEvent) => {
            const film = this.filmOrder.find((event) => {
                return (event.id === (screeningEvent.coaInfo.titleCode + screeningEvent.coaInfo.titleBranchNum));
            });
            if (film === undefined) {
                this.filmOrder.push({
                    id: (screeningEvent.coaInfo.titleCode + screeningEvent.coaInfo.titleBranchNum),
                    films: [screeningEvent]
                });
            } else {
                film.films.push(screeningEvent);
            }
        });
    }

}
