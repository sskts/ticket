/**
 * PurchaseComponent
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BsModalService } from 'ngx-bootstrap';
import { environment } from '../../../../../../environments/environment';
import { getConfig, object2query, sleep } from '../../../../../functions';
import { Performance } from '../../../../../models/performance';
import { ISchedule, IScheduleData } from '../../../../../models/schedule';
import { ApplicationStatus } from '../../../../../models/util';
import {
    AwsCognitoService,
    IConfirm,
    IPurchaseConditions,
    MaintenanceService,
    MemberType,
    PurchaseSort,
    SelectService,
    UserService,
    UtilService,
} from '../../../../../services';
import {
    OwnershipInfoType,
    SellerType,
    SmartTheaterService,
} from '../../../../../services/smart-theater.service';
import { AppearPopupComponent } from '../../../../shared/components/parts/appear-popup/appear-popup.component';

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
    styleUrls: ['./purchase-index.component.scss'],
})
/**
 * チケット購入
 * @class PurchaseIndexComponent
 * @implements OnInit
 */
export class PurchaseIndexComponent implements OnInit, OnDestroy {
    public isLoading: boolean;
    public theaters: SellerType.ISeller[];
    public dateList: IDate[];
    public schedules: ISchedule[];
    public schedule?: ISchedule;
    public conditions: IPurchaseConditions;
    public error: string;
    public purchaseSort: typeof PurchaseSort;
    public isPreSale: boolean;
    public isCOASchedule: boolean;
    public theatreName: string;
    public maintenance: {
        confirm?: IConfirm;
        schedule?: { message?: string };
    };
    public scheduleTimer: any;
    public sellers: {
        branchCode: string;
        id: string;
        name: string;
        alias: string;
    }[];
    public isMember: boolean;

    constructor(
        public userService: UserService,
        private router: Router,
        private smartTheaterService: SmartTheaterService,
        private selectService: SelectService,
        private utilService: UtilService,
        private maintenanceService: MaintenanceService,
        private awsCognitoService: AwsCognitoService,
        private modal: BsModalService
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
        this.maintenance = {};
        this.isMember = this.userService.isMember();
        try {
            this.maintenance.confirm = await this.maintenanceService.confirm();
            if (this.maintenance.confirm.isMaintenance) {
                this.isLoading = false;
                return;
            }
            this.sellers = await this.utilService.getJson<
                {
                    branchCode: string;
                    id: string;
                    name: string;
                    alias: string;
                }[]
            >(`${getConfig().scheduleApiEndpoint}/seller/seller.json`);
            this.conditions = this.selectService.data.purchase;
            if (this.isMember) {
                // 会員
                await this.userService.updateAccount();
                if (this.conditions.theater === '') {
                    const theater = this.userService.getWellGoTheaterCode();
                    this.conditions.theater =
                        theater !== undefined ? theater : '';
                }
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
     * 破棄
     */
    public ngOnDestroy() {
        if (this.scheduleTimer !== undefined) {
            clearTimeout(this.scheduleTimer);
        }
    }

    /**
     * 初期化
     */
    private async initialize() {
        try {
            this.theaters = [];
            this.dateList = [];
            this.schedules = [];
            await this.smartTheaterService.getServices();
            this.theaters = await this.smartTheaterService.seller.search({
                exclude: true,
                sort: true,
            });
            const findResult = this.theaters.find(
                (t) => t.branchCode === this.conditions.theater
            );
            if (findResult === undefined) {
                this.conditions.theater = '';
                this.maintenance.schedule = undefined;
            }
            if (this.conditions.theater !== '') {
                const scheduleData = await this.getSchedule();
                this.schedules = scheduleData.schedule;
                this.maintenance.schedule = scheduleData.maintenance;
                await this.createDateList();
                await this.createSchedule();
            }
            const time = 1000 * 60 * 10;
            this.scheduleTimer = setTimeout(async () => {
                await this.update();
            }, time);
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: 'エラー',
                body: 'スケジュールの取得に失敗しました。',
            });
        }
    }

    /**
     * 劇場変更
     */
    public async changeTheater() {
        this.selectService.data.purchase.theater = this.conditions.theater;
        this.selectService.save();
        this.isLoading = true;
        try {
            await this.initialize();
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
        if (this.scheduleTimer !== undefined) {
            clearTimeout(this.scheduleTimer);
        }
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
     * @method selectPerformance
     */
    public async selectPerformance(params: { performance: Performance }) {
        try {
            const { status } = await this.utilService.getApplicationStatus();
            if (status === ApplicationStatus.MEMBERSHIP_COUPON_CLOSE) {
                this.router.navigate(['/purchase/close']);
                return;
            }
            if (this.isMember) {
                this.isLoading = true;
                const isAvailabilityMemberships =
                    await this.isAvailabilityMemberships();

                if (!isAvailabilityMemberships) {
                    this.isLoading = false;
                    if (status !== ApplicationStatus.NO_RELEASE) {
                        this.utilService.openAlert({
                            title: '会員有効期限が切れています',
                            body: 'マイページより会員移行を行っていただき、有効期限更新のお手続きを対応いただくことで継続できます。',
                        });
                        return;
                    }
                    // 有効なメンバーシップなし
                    this.router.navigate(['/auth/register/credit']);
                    return;
                }
            }
            const { performance } = params;
            const seller = this.sellers.find(
                (s) => s.alias === this.theatreName
            );
            if (seller === undefined) {
                throw new Error('seller undefined');
            }
            const id = `${this.conditions.theater}${performance.createId()}`;
            const commonQuery = {
                id,
                sellerId: seller.id,
                redirectUrl: getConfig().ticketSiteUrl,
                native: '1',
                clientId: this.smartTheaterService.getClientId(),
            };
            let query;
            if (this.isMember) {
                query = {
                    ...commonQuery,
                    member: MemberType.Member,
                    username: this.userService.data.userName,
                };
            } else {
                if (this.awsCognitoService.credentials === undefined) {
                    throw new Error('awsCognito.credentials is undefined');
                }
                query = {
                    ...commonQuery,
                    identityId: this.awsCognitoService.credentials.identityId,
                    member: MemberType.NotMember,
                };
            }
            const url = `${
                getConfig().entranceServerUrl
            }/ticket/index.html?${object2query(query)}`;
            const popupMessage1 =
                performance.time.popupMessage1 === ''
                    ? undefined
                    : performance.time.popupMessage1;
            const popupMessage2 =
                performance.time.popupMessage2 === ''
                    ? undefined
                    : performance.time.popupMessage2;
            if (popupMessage1 === undefined && popupMessage2 === undefined) {
                location.href = url;
                return;
            }
            this.isLoading = false;
            this.modal.show(AppearPopupComponent, {
                initialState: {
                    title: popupMessage1,
                    read: popupMessage2,
                    cb: () => {
                        location.href = url;
                    },
                },
                class: 'modal-dialog-centered',
            });
        } catch (error) {
            console.error(error);
        }
    }

    // 有効なメンバーシップを持っているか
    public async isAvailabilityMemberships() {
        const isAvailabilityMemberships = async (params: {
            memberships: OwnershipInfoType.IMembership[];
        }) => {
            const now = (await this.utilService.getServerTime()).date;
            const filterResult = params.memberships.filter(
                (p) => moment(p.ownedThrough).unix() > moment(now).unix()
            );
            return filterResult.length > 0;
        };
        const memberships =
            this.userService.data.programMembershipOwnershipInfos;
        let isAvailability = await isAvailabilityMemberships({ memberships });
        if (isAvailability) {
            // 期限内会員
            // プログラムメンバーシップ登録済み判定を保存
            this.userService.data.programMembershipRegistered = true;
            this.userService.save();
            return true;
        }
        await this.smartTheaterService.getServices();
        const searchResult =
            await this.smartTheaterService.ownershipInfo.searchMemberships({
                page: 1,
            });
        if (searchResult.length > 0) {
            // プログラムメンバーシップ登録済み判定を保存
            this.userService.data.programMembershipRegistered = true;
            this.userService.save();
        }
        isAvailability = await isAvailabilityMemberships({ memberships });
        if (!isAvailability) {
            // 期限切れ会員
            return false;
        }
        // プログラムメンバーシップを保存
        this.userService.data.programMembershipOwnershipInfos = searchResult;
        this.userService.save();

        return true;
    }

    /**
     * スケジュール取得
     */
    private async getSchedule(): Promise<IScheduleData> {
        const now = (await this.utilService.getServerTime()).date;
        const branchCode = this.conditions.theater;
        const findResult = this.sellers.find(
            (s) => branchCode === s.branchCode
        );
        if (findResult === undefined) {
            throw new Error('劇場が見つかりません');
        }
        this.theatreName = findResult.alias;
        const url = `${getConfig().scheduleApiEndpoint}/${
            findResult.alias
        }/schedule.json?date=${now}`;
        const json = await this.utilService.getJson<IScheduleData>(url);
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
                (m) =>
                    m.screen.find(
                        (s) =>
                            s.time.find((t) => {
                                const endDate =
                                    t.start_time < t.end_time
                                        ? moment(
                                              `${schedule.date} ${t.end_time}`,
                                              'YYYYMMDD HHmm'
                                          )
                                        : moment(
                                              `${schedule.date} ${t.end_time}`,
                                              'YYYYMMDD HHmm'
                                          ).add(1, 'days');
                                return (
                                    moment(t.online_display_start_day) <=
                                        moment(today) && endDate > now
                                );
                            }) !== undefined
                    ) !== undefined
            );
            const preSale = schedule.movie.find(
                (m) =>
                    m.screen.find(
                        (s) =>
                            s.time.find((t) => {
                                const rsvStartDate = moment(
                                    `${t.rsv_start_day} ${t.rsv_start_time}`,
                                    'YYYYMMDD HHmm'
                                );
                                const startDate = moment(
                                    `${schedule.date} ${t.start_time}`,
                                    'YYYYMMDD HHmm'
                                );
                                const diff = Number(
                                    environment.PRE_SALE_DIFFERENCE_DAY
                                );
                                return (
                                    startDate.diff(rsvStartDate, 'day') > diff
                                );
                            }) !== undefined
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
                        year: date.format('YYYY'),
                    },
                    preSale: preSale !== undefined,
                    serviceDay: schedule.name_service_day,
                });
            }
        });
        this.dateList = result;
        this.isPreSale =
            this.dateList.find((date) => date.preSale) !== undefined;
    }

    /**
     * スケジュール作成
     */
    private async createSchedule() {
        this.schedule = undefined;
        await sleep(0);
        const now = moment();
        const today = moment(now).format('YYYYMMDD');
        const searchDate =
            this.dateList.find((d) => d.value === this.conditions.date) ===
            undefined
                ? today
                : this.conditions.date;
        this.conditions.date = searchDate;
        this.schedule = this.schedules.find(
            (s) => s.date === this.conditions.date
        );
        if (this.schedule === undefined) {
            return;
        }
        // 作品順ソート
        this.schedule.movie.sort((a, b) => {
            if (a.sort_no < b.sort_no) {
                return -1;
            } else {
                return 1;
            }
        });
    }

    /**
     * メンテナンス判定
     */
    public isMaintenance(maintenanceType?: 'confirm' | 'schedule') {
        const confirm =
            this.maintenance.confirm && this.maintenance.confirm.isMaintenance;
        const schedule =
            this.maintenance.schedule &&
            this.maintenance.schedule.message !== undefined;
        if (maintenanceType === 'confirm') {
            return confirm;
        } else if (maintenanceType === 'schedule') {
            return schedule;
        }
        return confirm || schedule;
    }
}
