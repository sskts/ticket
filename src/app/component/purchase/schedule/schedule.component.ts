/**
 * ScheduleComponent
 */
import { Component, OnInit } from '@angular/core';
import { Jsonp } from '@angular/http';
import { Router } from '@angular/router';
import * as sasaki from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import { IFilmOrder, ScreeningEventsModel } from '../../../model/screening-events/screening-events.model';

// tslint:disable:no-import-side-effect
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/toPromise';
import { UserService } from '../../../service/user/user.service';

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
    public isLoading: boolean;
    public movieTheaters: IMovieTheater[];
    public dateList: { value: string; text: string; }[];
    public movieTheater: string;
    public date: string;
    public screeningEvents: ScreeningEventsModel;
    public filmOrder: IFilmOrder[];
    public config: SwiperOptions;
    public error: string;

    constructor(
        private jsonp: Jsonp,
        private router: Router,
        private user: UserService
    ) { }

    public async ngOnInit() {
        this.isLoading = true;
        this.config = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoHeight: true
        };
        try {
            this.movieTheaters = await this.user.getMovieTheaters();
            const select = await this.user.getSelect();
            this.movieTheater = select.purchase.theater;
            this.dateList = this.createDate();
            const selectDate = this.dateList.find((date) => (select.purchase.date === date.value));
            this.date = (selectDate === undefined) ? this.dateList[0].value : selectDate.value;
            this.screeningEvents = new ScreeningEventsModel();
            this.filmOrder = [];
            await this.changeConditions();
            this.isLoading = false;
        } catch (err) {
            this.router.navigate(['/error', { redirect: '/purchase' }]);
            console.log(err);
        }
    }

    private createDate() {
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

    public async changeConditions() {
        this.isLoading = true;
        this.user.select.purchase = {
            theater: this.movieTheater,
            date: this.date
        };
        await this.user.save();
        if (this.date === '' || this.movieTheater === '') {
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

    public async fitchPerformances() {
        const url = `${environment.ticketingSite}/purchase/performances/getPerformances`;
        const options = {
            search: {
                callback: 'JSONP_CALLBACK',
                theater: this.movieTheater,
                day: this.date
            }
        };
        const response = await this.jsonp.get(url, options).retry(3).toPromise();
        if (response.json().error !== null) {
            throw new Error(response.json().error);
        }
        this.screeningEvents.individualScreeningEvents = response.json().result;
        this.filmOrder = this.screeningEvents.getEventByFilmOrder();
    }

}
