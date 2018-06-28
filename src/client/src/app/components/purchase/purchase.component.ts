/**
 * PurchaseComponent
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDate, IFilmOrder, IIndividualScreeningEvent, IMovieTheater, PurchaseService } from '../../services/purchase/purchase.service';
import { IPurchaseConditions, PurchaseSort, SelectService } from '../../services/select/select.service';
import { UserService } from '../../services/user/user.service';

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
    public timeOrder: IIndividualScreeningEvent[];
    public conditions: IPurchaseConditions;
    public error: string;
    public purchaseSort: typeof PurchaseSort;
    public isPreSale: boolean;

    constructor(
        private router: Router,
        private purchase: PurchaseService,
        private select: SelectService,
        private user: UserService
    ) {
        this.purchaseSort = PurchaseSort;
        this.theaters = [];
        this.dateList = [];
        this.filmOrder = [];
        this.timeOrder = [];
    }

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        this.isLoading = true;
        try {
            this.conditions = this.select.data.purchase;
            // console.log('conditions', this.conditions);
            if (this.user.isMember()) {
                // 会員
                this.conditions.theater = this.user.getTheaterCode(0);
            }
            await this.purchase.getSchedule();
            this.theaters = this.purchase.getTheater();
            await this.changeConditions();
        } catch (err) {
            this.router.navigate(['/error', { redirect: '/purchase' }]);
            console.log('PurchaseComponent.ngOnInit', err);
        }

        this.isLoading = false;
    }

    /**
     * 条件変更
     * @method changeConditions
     */
    public async changeConditions() {
        this.isLoading = true;
        this.select.data.purchase = this.conditions;
        this.select.save();
        this.filmOrder = [];
        this.timeOrder = [];
        try {
            await this.purchase.getSchedule();
            this.theaters = this.purchase.getTheater();
            const selectTheater = this.theaters.find((theater) => {
                return (theater.location.branchCode === this.conditions.theater);
            });
            if (selectTheater === undefined) {
                this.select.data.purchase.theater = '';
                this.select.data.purchase.date = '';
                this.select.save();
                this.isLoading = false;

                return;
            }
            this.dateList = await this.purchase.getDate(selectTheater.location.branchCode);
            const selectDate = this.dateList.find((date) => {
                return (date.value === this.conditions.date);
            });
            const preSaleList = this.dateList.filter((date) => {
                return (date.preSale);
            });
            this.isPreSale = (preSaleList.length > 0);
            if (selectDate === undefined) {
                this.select.data.purchase.date = '';
                this.select.save();
                this.isLoading = false;

                return;
            }

            const getScreeningEventsResult = this.purchase.getScreeningEvents({
                theater: this.conditions.theater,
                date: this.conditions.date,
                sort: this.conditions.sort
            });
            this.timeOrder = getScreeningEventsResult.time;
            this.filmOrder = getScreeningEventsResult.film;
        } catch (err) {
            this.router.navigate(['/error', { redirect: '/purchase' }]);
            console.log(err);
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
        await this.changeConditions();
    }

    /**
     * 日付選択
     * @method selectDate
     */
    public async selectDate(date: IDate) {
        this.conditions.date = date.value;
        await this.changeConditions();
    }

}
