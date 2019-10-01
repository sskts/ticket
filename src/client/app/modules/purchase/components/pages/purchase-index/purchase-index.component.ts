/**
 * PurchaseComponent
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';
import { environment } from '../../../../../../environments/environment';
import { object2query } from '../../../../../functions';
import {
    AwsCognitoService,
    IConfirm,
    IPurchaseConditions,
    MaintenanceService,
    MemberType,
    PurchaseSort,
    SasakiService,
    SelectService,
    UserService,
    UtilService
} from '../../../../../services';

type IMovieTheater = factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>;
type IEvent = factory.chevre.event.screeningEvent.IEvent;
type ICOAInfo = factory.event.screeningEvent.ICOAInfo;
type ITimeOrder = IEvent;

interface IFilmOrder {
    id: string;
    films: IEvent[];
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
    templateUrl: './purchase-index.component.html',
    styleUrls: ['./purchase-index.component.scss']
})
/**
 * チケット購入
 * @class PurchaseIndexComponent
 * @implements OnInit
 */
export class PurchaseIndexComponent implements OnInit {
    public isLoading: boolean;
    public theaters: IMovieTheater[];
    public dateList: IDate[];
    public filmOrder: IFilmOrder[];
    public timeOrder: ITimeOrder[];
    public screeningEvents: IEvent[];
    public conditions: IPurchaseConditions;
    public error: string;
    public purchaseSort: typeof PurchaseSort;
    public isPreSale: boolean;
    public maintenanceInfo: IConfirm;

    constructor(
        private router: Router,
        private sasakiService: SasakiService,
        private selectService: SelectService,
        private userService: UserService,
        private utilService: UtilService,
        private maintenanceService: MaintenanceService,
        private awsCognitoService: AwsCognitoService
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
            this.maintenanceInfo = await this.maintenanceService.confirm();
            if (this.maintenanceInfo.isMaintenance) {
                this.isLoading = false;

                return;
            }
            this.conditions = this.selectService.data.purchase;
            if (this.userService.isMember() && this.conditions.theater === '') {
                // 会員
                const theater = this.userService.getWellGoTheaterCode();
                this.conditions.theater = theater !== undefined ? theater : '';
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
        const findResult = this.theaters.find(theater =>
            theater.location !== undefined && theater.location.branchCode === this.conditions.theater);
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
        this.selectService.data.purchase.theater = this.conditions.theater;
        this.selectService.save();
        try {
            await this.sasakiService.getServices();
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
        this.selectService.data.purchase.sort = sort;
        this.selectService.save();
    }

    /**
     * 日付選択
     * @method selectDate
     */
    public async selectDate(date: IDate) {
        this.conditions.date = date.value;
        this.selectService.data.purchase.date = this.conditions.date;
        this.selectService.save();
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
    public async performanceSelect(performance: IEvent) {
        if (performance.offers === undefined || performance.offers.availability === 0) {
            return;
        }
        let params;
        if (this.userService.isMember()) {
            params = {
                id: performance.identifier,
                native: '1',
                member: MemberType.Member,
                clientId: this.sasakiService.auth.options.clientId
            };
        } else {
            if (this.awsCognitoService.credentials === undefined) {
                throw new Error('awsCognito.credentials is undefined');
            }
            params = {
                id: performance.identifier,
                identityId: this.awsCognitoService.credentials.identityId,
                native: '1',
                member: MemberType.NotMember,
                clientId: this.sasakiService.auth.options.clientId
            };
        }
        const url = `${environment.ENTRANCE_SERVER_URL}/ticket/index.html?${object2query(params)}`;
        location.href = url;
    }

    /**
     * 劇場一覧取得
     */
    private async getTheaters() {
        await this.sasakiService.getServices();
        const sellerSearchResult = await this.sasakiService.seller.search({ typeOfs: [factory.organizationType.MovieTheater] });
        const theaters = sellerSearchResult.data.filter((s) => {
            return (s.location !== undefined
                && s.location.branchCode !== undefined
                && s.location.branchCode !== ''
                && environment.CLOSE_THEATERS.find(t => t === (<any>s.location).branchCode) === undefined);
        });
        // 除外劇場処理
        const excludeTheatersResult = await this.maintenanceService.excludeTheaters();
        if (!excludeTheatersResult.isExclude) {
            return theaters;
        }

        return theaters.filter((theater) => {
            const excludeTheater = excludeTheatersResult.theaters.find((excludeCode) => {
                return (theater.location === undefined
                    || theater.location.branchCode === undefined
                    || excludeCode === theater.location.branchCode);
            });

            return (excludeTheater === undefined);
        });
    }

    /**
     * スケジュール取得
     */
    private async getScreeningEvents() {
        await this.sasakiService.getServices();
        const branchCode = this.conditions.theater;
        const findResult = this.theaters.find(theater => theater.location !== undefined && theater.location.branchCode === branchCode);
        if (findResult === undefined) {
            return [];
        }
        const now = (await this.utilService.getServerTime()).date;
        const today = moment(moment(now).format('YYYYMMDD')).toDate();
        let screeningEvents: factory.chevre.event.screeningEvent.IEvent[] = [];
        const screeningEventsResult = await this.sasakiService.event.searchScreeningEvents({
            typeOf: factory.chevre.eventType.ScreeningEvent,
            eventStatuses: [factory.chevre.eventStatusType.EventScheduled],
            startFrom: moment(now).add(-24, 'hour').toDate(),
            startThrough: moment(now).add(5, 'week').toDate(),
            sort: { startDate: factory.sortType.Ascending },
            superEvent: { locationBranchCodes: [branchCode] }
        });
        screeningEvents = screeningEventsResult.data.filter((screeningEvent) => {
            const coaInfo = screeningEvent.coaInfo;
            if (coaInfo === undefined) {
                return false;
            }
            if (moment(coaInfo.dateJouei).unix() >= moment(today).unix()) {
                return true;
            }
            return moment(screeningEvent.endDate).unix() > moment(now).unix();
        });

        return screeningEvents;
    }

    /**
     * 先行販売かどうかをチェックする
     */
    private checkEventPreSale(event: IEvent): boolean {
        const salesDate = moment().add(2, 'days').format('YYYYMMDD');
        const startDate = moment(event.startDate).format('YYYYMMDD');
        const today = moment().format('YYYYMMDD');
        const PRE_SALE = '1'; // 先行販売
        return event.coaInfo !== undefined &&
            event.coaInfo.rsvStartDate <= today &&
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
            if (screeningEvent.coaInfo === undefined) {
                return;
            }
            const coaInfo: ICOAInfo = screeningEvent.coaInfo;
            const startDate = moment(screeningEvent.startDate).format('YYYYMMDD');
            const isSalse = coaInfo.rsvStartDate <= today;
            if (!isSalse && startDate >= limitDate) {
                return;
            }
            const findResult = result.find((date) => coaInfo.dateJouei === date.value);
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
                    serviceDay: coaInfo.nameServiceDay
                });
            } else if (this.checkEventPreSale(screeningEvent)) {
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
        const now = moment();
        const today = moment(now).format('YYYYMMDD');
        const searchDate = (this.dateList.find(d => d.value === this.conditions.date) === undefined)
            ? today : this.conditions.date;
        this.conditions.date = searchDate;
        // 選択したスケジュールを抽出　上映終了は除外
        const selectFilterResult = this.screeningEvents
            .filter((screeningEvent) => {
                return (screeningEvent.coaInfo !== undefined
                    && screeningEvent.coaInfo.dateJouei === searchDate
                    && moment(screeningEvent.endDate).unix() > moment(now).unix());
            });

        this.timeOrder = selectFilterResult;
        selectFilterResult.forEach((screeningEvent) => {
            if (screeningEvent.coaInfo === undefined) {
                return;
            }
            const coaInfo: ICOAInfo = screeningEvent.coaInfo;
            const film = this.filmOrder.find((event) => {
                return (coaInfo !== undefined && event.id === (coaInfo.titleCode + coaInfo.titleBranchNum));
            });
            if (film === undefined) {
                this.filmOrder.push({
                    id: (coaInfo.titleCode + coaInfo.titleBranchNum),
                    films: [screeningEvent]
                });
            } else {
                film.films.push(screeningEvent);
            }
        });
        // 作品名昇順へソート
        this.filmOrder.sort(function (a, b) {
            if (a.films[0].name.ja > b.films[0].name.ja) {
                return 1;
            } else {
                return -1;
            }
        });
    }
}
