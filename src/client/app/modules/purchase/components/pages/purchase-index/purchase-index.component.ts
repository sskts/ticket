/**
 * PurchaseComponent
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/api-javascript-client';
import * as moment from 'moment';
import { xml2js } from 'xml-js';
import { environment } from '../../../../../../environments/environment';
import { object2query } from '../../../../../functions';
import {
    AwsCognitoService,
    CinerinoService,
    IConfirm,
    IPurchaseConditions,
    MaintenanceService,
    MasterService,
    MemberType,
    PurchaseSort,
    SelectService,
    UserService,
    UtilService
} from '../../../../../services';

type IMovieTheater = factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>;
type ICOAInfo = factory.event.screeningEvent.ICOAInfo;

interface IFilmOrder {
    id: string;
    films: factory.chevre.event.screeningEvent.IEvent[];
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
    public timeOrder: factory.chevre.event.screeningEvent.IEvent[];
    public screeningEvents: factory.chevre.event.screeningEvent.IEvent[];
    public conditions: IPurchaseConditions;
    public error: string;
    public purchaseSort: typeof PurchaseSort;
    public isPreSale: boolean;
    public maintenanceInfo: IConfirm;
    public isCOASchedule: boolean;
    public scheduleApiEndpoint?: string;

    constructor(
        private router: Router,
        private cinerinoService: CinerinoService,
        private selectService: SelectService,
        private userService: UserService,
        private utilService: UtilService,
        private maintenanceService: MaintenanceService,
        private awsCognitoService: AwsCognitoService,
        private masterService: MasterService
    ) {
        this.purchaseSort = PurchaseSort;
    }

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        this.isLoading = true;
        this.isCOASchedule = false;
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
        this.scheduleApiEndpoint = undefined;
        this.theaters = [];
        this.dateList = [];
        this.filmOrder = [];
        this.timeOrder = [];
        this.theaters = await this.masterService.searchSeller(
            { typeOfs: [factory.organizationType.MovieTheater] },
            {exclude: true, sort: true}
        );
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
            await this.cinerinoService.getServices();
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
    public async performanceSelect(performance: factory.chevre.event.screeningEvent.IEvent) {
        if (performance.offers === undefined || performance.offers.availability === 0) {
            return;
        }
        let params;
        if (this.userService.isMember()) {
            params = {
                id: performance.identifier,
                native: '1',
                member: MemberType.Member,
                clientId: this.cinerinoService.auth.options.clientId
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
                clientId: this.cinerinoService.auth.options.clientId
            };
        }
        const url = `${environment.ENTRANCE_SERVER_URL}/ticket/index.html?${object2query(params)}`;
        location.href = url;
    }

    /**
     * スケジュール取得
     */
    private async getScreeningEvents() {
        await this.cinerinoService.getServices();
        const branchCode = this.conditions.theater;
        const findResult = this.theaters.find(theater => theater.location !== undefined && theater.location.branchCode === branchCode);
        if (findResult === undefined) {
            return [];
        }
        const now = (await this.utilService.getServerTime()).date;
        const today = moment(moment(now).format('YYYYMMDD')).toDate();
        let screeningEvents: factory.chevre.event.screeningEvent.IEvent[] = [];
        const screeningEventsResult = await this.cinerinoService.event.search({
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
        /**
         * TODO
         * JSONへ移行する
         * xml2jsと合わせて依存関係も削除（timers,stream）
         */
        const theatreTable =
            await this.utilService.getJson<{ code: string; name: string }[]>('/json/table/theaters.json');
        const prefix = (environment.production) ? '0' : '1';
        const theatreTableFindResult = theatreTable.find(t => branchCode === `${prefix}${t.code}`);
        if (theatreTableFindResult === undefined) {
            throw new Error('劇場が見つかりません');
        }
        if (this.scheduleApiEndpoint === undefined) {
            this.scheduleApiEndpoint = (await this.utilService.getJson<{
                scheduleApiEndpoint: string
            }>(`/api/config?date${moment().toISOString()}`)).scheduleApiEndpoint;
        }
        const url = `${this.scheduleApiEndpoint}/${theatreTableFindResult.name}/schedule/xml/schedule.xml?date=${now}`;
        const xml = await this.utilService.getText(url);
        if (!(/\<rsv_start_day\>/.test(xml)
            && /\<\/rsv_start_day\>/.test(xml)
            && /\<rsv_start_time\>/.test(xml)
            && /\<\/rsv_start_time\>/.test(xml))) {
            // COA版通常販売で3日以上先のイベントを販売不可へ変更
            this.isCOASchedule = true;
            const customScreeningEvents: factory.chevre.event.screeningEvent.IEvent[] = [];
            const differenceDay = Number(environment.PRE_SALE_DIFFERENCE_DAY);
            screeningEvents.forEach((evant) => {
                if (evant.coaInfo !== undefined
                    && evant.coaInfo.flgEarlyBooking === '0'
                    && moment(evant.coaInfo.dateJouei).diff(moment(today), 'day') > differenceDay) {
                    evant.coaInfo.rsvStartDate = moment(today).add(1, 'day').format('YYYYMMDD');
                }
                customScreeningEvents.push(evant);
            });

            return customScreeningEvents;
        }
        this.isCOASchedule = false;
        const updateScreeningEvents: factory.chevre.event.screeningEvent.IEvent[] = [];
        const scheduleResult = <any>xml2js(xml, { compact: true });
        screeningEvents.forEach((screeningEvent) => {
            const coaInfo = screeningEvent.coaInfo;
            if (coaInfo === undefined) {
                return;
            }
            // console.log('scheduleResult', scheduleResult);
            // console.log('coaInfo', coaInfo);
            const schedule: any[] = (Array.isArray(scheduleResult.schedules.schedule))
                ? scheduleResult.schedules.schedule : [scheduleResult.schedules.schedule];
            const scheduleFindResult = schedule.find((s: any) => s.date._text === coaInfo.dateJouei);
            if (scheduleFindResult === undefined) {
                return;
            }
            // console.log('scheduleFindResult', scheduleFindResult);
            const movie: any[] = (Array.isArray(scheduleFindResult.movie))
                ? scheduleFindResult.movie : [scheduleFindResult.movie];
            const movieFindResult = movie.find((m: any) => {
                return (m.movie_short_code._cdata === coaInfo.titleCode
                    && m.movie_branch_code._cdata === coaInfo.titleBranchNum);
            });
            if (movieFindResult === undefined) {
                return;
            }
            // console.log('movieFindResult', movieFindResult);
            const screen: any[] = (Array.isArray(movieFindResult.screen))
                ? movieFindResult.screen : [movieFindResult.screen];
            const screenFindResult = screen.find((s: any) => s.screen_code._cdata === coaInfo.screenCode);
            if (screenFindResult === undefined) {
                return;
            }
            // console.log('screenFindResult', screenFindResult);
            const time: any[] = (Array.isArray(screenFindResult.time))
                ? screenFindResult.time : [screenFindResult.time];
            const timeFindResult =
                time.find((t: any) => (t.start_time._text === coaInfo.timeBegin));
            if (timeFindResult === undefined) {
                return;
            }
            // console.log('timeFindResult', timeFindResult);
            if (timeFindResult.rsv_start_day === undefined
                || timeFindResult.rsv_start_time === undefined) {
                return;
            }
            const reservation = {
                year: timeFindResult.rsv_start_day._cdata.slice(0, 4),
                month: timeFindResult.rsv_start_day._cdata.slice(4, 6),
                day: timeFindResult.rsv_start_day._cdata.slice(6, 8),
                hour: timeFindResult.rsv_start_time._cdata.slice(0, 2),
                minute: timeFindResult.rsv_start_time._cdata.slice(2, 4),
            };
            const date =
                moment(`${reservation.year}-${reservation.month}-${reservation.day} ${reservation.hour}:${reservation.minute}`)
                    .toISOString();
            updateScreeningEvents.push({
                ...screeningEvent,
                coaInfo: { ...coaInfo, rsvStartDate: date }
            });
        });
        return updateScreeningEvents;
    }

    /**
     * 先行販売かどうかをチェックする
     */
    private checkEventPreSale(screeningEvent: factory.chevre.event.screeningEvent.IEvent): boolean {
        if (screeningEvent.coaInfo === undefined) {
            return false;
        }
        const PRE_SALE = '1'; // 先行販売
        const coaInfo = screeningEvent.coaInfo;
        const differenceDay = Number(environment.PRE_SALE_DIFFERENCE_DAY);
        if (this.isCOASchedule) {
            return (coaInfo.flgEarlyBooking === PRE_SALE);
        }
        return (coaInfo.flgEarlyBooking === PRE_SALE
            || moment(coaInfo.dateJouei).diff(moment(coaInfo.rsvStartDate), 'day') > differenceDay);
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
