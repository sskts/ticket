/**
 * ScheduleComponent
 */
import { Component, OnInit } from '@angular/core';
import { Jsonp } from '@angular/http';
import { Router } from '@angular/router';
import * as sasaki from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';
// tslint:disable:no-import-side-effect
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../../environments/environment';
import { IFilmOrder, ScreeningEventsModel } from '../../../model/screening-events/screening-events.model';
import { UserModel } from '../../../model/user/user.model';
import { AwsCognitoService } from '../../../service/aws-cognito/aws-cognito.service';
import { PurchaseService } from '../../../service/purchase/purchase.service';

type IMovieTheater = sasaki.factory.place.movieTheater.IPlaceWithoutScreeningRoom;

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss']
})
/**
 * チケット購入
 * @class ScheduleComponent
 * @implements OnInit
 */
export class ScheduleComponent implements OnInit {
    public userModel: UserModel;
    public isLoading: boolean;
    public movieTheaters: IMovieTheater[];
    public dateList: { value: string; text: string; }[];
    public screeningEventsModel: ScreeningEventsModel;
    public filmOrder: IFilmOrder[];
    public config: SwiperOptions;
    public error: string;

    constructor(
        private jsonp: Jsonp,
        private router: Router,
        private purchase: PurchaseService,
        private awsCognito: AwsCognitoService
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     * @returns {Promise<void>}
     */
    public async ngOnInit(): Promise<void> {
        this.isLoading = true;
        this.config = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoHeight: true
        };
        this.userModel = new UserModel();
        try {
            this.movieTheaters = await this.purchase.getMovieTheaters();
            const userRecord = await this.awsCognito.getRecords('user');
            this.userModel = new UserModel(userRecord);
            this.dateList = this.createDate();
            const selectDate = this.dateList.find((date) => (this.userModel.select.purchase.date === date.value));
            this.userModel.select.purchase.date = (selectDate === undefined) ? this.dateList[0].value : selectDate.value;
            this.screeningEventsModel = new ScreeningEventsModel();
            this.filmOrder = [];
            await this.changeConditions();
            this.isLoading = false;
        } catch (err) {
            this.router.navigate(['/error', { redirect: '/purchase' }]);
            console.log(err);
        }
    }

    /**
     * 初期化
     * @method createDate
     * @returns { value: string; text: string; }
     */
    private createDate(): { value: string; text: string; }[] {
        const limit = 3;
        const results: { value: string; text: string; }[] = [];
        for (let i = 0; i < limit; i += 1) {
            const date = moment().add(i, 'day');
            results.push({
                value: date.format('YYYYMMDD'),
                text: (i === 0) ? '本日'
                    : (i === 1) ? '明日'
                        : (i === 2) ? '明後日'
                            : date.format('YYYY年MM月DD日')
            });
        }

        return results;
    }

    /**
     * 条件変更
     * @method changeConditions
     * @returns {Promise<void>}
     */
    public async changeConditions(): Promise<void> {
        this.isLoading = true;
        await this.awsCognito.updateRecords('user', this.userModel.convertToRecord());
        if (this.userModel.select.purchase.date === ''
            || this.userModel.select.purchase.theater === '') {
            this.filmOrder = [];
            this.isLoading = false;

            return;
        }
        try {
            await this.fitchPerformances();
            this.isLoading = false;
        } catch (err) {
            this.router.navigate(['/error', { redirect: '/purchase' }]);
            console.log(err);
        }
    }

    /**
     * パフォーマンス一覧をAPI経由で取得
     * @method fitchPerformances
     * @returns {Promise<void>}
     */
    public async fitchPerformances(): Promise<void> {
        const url = `${environment.ticketingSite}/purchase/performances/getPerformances`;
        const options = {
            search: {
                callback: 'JSONP_CALLBACK',
                theater: this.userModel.select.purchase.theater,
                day: this.userModel.select.purchase.date
            }
        };
        const response = await this.jsonp.get(url, options).retry(3).toPromise();
        if (response.json().error !== null) {
            throw new Error(response.json().error);
        }
        this.screeningEventsModel.individualScreeningEvents = response.json().result;
        this.filmOrder = this.screeningEventsModel.getEventByFilmOrder();
    }

}
