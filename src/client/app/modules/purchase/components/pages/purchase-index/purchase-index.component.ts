/**
 * PurchaseComponent
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/api-javascript-client';
import * as moment from 'moment';
import { environment } from '../../../../../../environments/environment';
import { object2query, sleep } from '../../../../../functions';
import { ISchedule } from '../../../../../models/schedule';
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
    public schedules: ISchedule[];
    public schedule?: ISchedule;
    public conditions: IPurchaseConditions;
    public error: string;
    public purchaseSort: typeof PurchaseSort;
    public isPreSale: boolean;
    public maintenanceInfo: IConfirm;
    public isCOASchedule: boolean;
    public scheduleApiEndpoint?: string;

    constructor(
        public userService: UserService,
        private router: Router,
        private cinerinoService: CinerinoService,
        private selectService: SelectService,
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
        try {
            this.scheduleApiEndpoint = undefined;
            this.theaters = [];
            this.dateList = [];
            this.schedules = [];
            this.theaters = await this.masterService.searchSeller(
                { typeOfs: [factory.organizationType.MovieTheater] },
                { exclude: true, sort: false }
            );
            const findResult = this.theaters.find(theater =>
                theater.location !== undefined && theater.location.branchCode === this.conditions.theater);
            if (findResult === undefined) {
                this.conditions.theater = '';
            }
            if (this.conditions.theater !== '') {
                this.schedules = await this.getSchedule();
                await this.createDateList();
                await this.createSchedule();
            }
        } catch (error) {
            this.router.navigate(['/error', { redirect: '/purchase' }]);
            console.error(error);
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
            this.schedules = await this.getSchedule();
            await this.createDateList();
            await this.createSchedule();
        } catch (error) {
            this.router.navigate(['/error', { redirect: '/purchase' }]);
            console.error(error);
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
        try {
            this.conditions.date = date.value;
            this.selectService.data.purchase.date = this.conditions.date;
            this.selectService.save();
            await this.createSchedule();
        } catch (error) {
            this.router.navigate(['/error', { redirect: '/purchase' }]);
            console.error(error);
        }
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
    public async performanceSelect(event: { id: string }) {
        const id = `${this.conditions.theater}${event.id}`;
        let params;
        if (this.userService.isMember()) {
            params = {
                id,
                native: '1',
                member: MemberType.Member,
                clientId: this.cinerinoService.auth.options.clientId
            };
        } else {
            if (this.awsCognitoService.credentials === undefined) {
                throw new Error('awsCognito.credentials is undefined');
            }
            params = {
                id,
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
    private async getSchedule() {
        const now = (await this.utilService.getServerTime()).date;
        const branchCode = this.conditions.theater;
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
        const url = `${this.scheduleApiEndpoint}/${theatreTableFindResult.name}/schedule/json/schedule.json?date=${now}`;
        const json = await this.utilService.getJson<ISchedule[]>(url);
        return json;
    }

    /**
     * 日付作成
     */
    private async createDateList() {
        const now = moment((await this.utilService.getServerTime()).date);
        const result: IDate[] = [];
        const today = moment(now).format('YYYYMMDD');
        this.schedules.forEach((schedule) => {
            const findResult = schedule.movie.find(
                m => m.screen.find(
                    s => s.time.find(
                        t => (moment(t.online_display_start_day) <= moment(today)
                            && moment(`${schedule.date} ${t.end_time}`, 'YYYYMMDD HHmm') > now)
                    ) !== undefined
                ) !== undefined
            );
            const preSale = schedule.movie.find(
                m => m.screen.find(
                    s => s.time.find((t) => {
                        const rsvStartDate = moment(`${t.rsv_start_day} ${t.rsv_start_time}`, 'YYYYMMDD HHmm');
                        const startDate = moment(`${schedule.date} ${t.start_time}`, 'YYYYMMDD HHmm');
                        const diff = Number(environment.PRE_SALE_DIFFERENCE_DAY);
                        return startDate.diff(rsvStartDate, 'day') > diff;
                    }
                    ) !== undefined
                ) !== undefined
            );

            if (findResult === undefined) {
                return;
            } else {
                const date = moment(schedule.date);
                result.push({
                    value: schedule.date,
                    display: {
                        month: date.format('MM'),
                        week: date.format('ddd'),
                        day: date.format('DD'),
                        year: date.format('YYYY')
                    },
                    preSale: preSale !== undefined,
                    serviceDay: ''
                });
            }
        });
        this.dateList = result;
        this.isPreSale = (this.dateList.find(date => date.preSale) !== undefined);
    }

    /**
     * スケジュール作成
     */
    private async createSchedule() {
        this.schedule = undefined;
        await sleep(0);
        const now = moment();
        const today = moment(now).format('YYYYMMDD');
        const searchDate = (this.dateList.find(d => d.value === this.conditions.date) === undefined)
            ? today : this.conditions.date;
        this.conditions.date = searchDate;
        this.schedule = this.schedules.find(s => s.date === this.conditions.date);
    }
}
