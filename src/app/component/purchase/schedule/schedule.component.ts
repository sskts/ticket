/**
 * ScheduleComponent
 */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as sasaki from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';

import { environment } from '../../../../environments/environment';
import { IFilmOrder, ScreeningEventsModel } from '../../../model/screening-events/screening-events.model';

// tslint:disable:no-import-side-effect
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/toPromise';

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
        private http: HttpClient,
        private router: Router
    ) { }

    public async ngOnInit() {
        this.isLoading = true;
        this.config = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoHeight: true
        };
        try {
            await this.fitchMovieTheaters();
            this.movieTheater = '';
            this.createDate();
            this.date = this.dateList[0].value;
            this.screeningEvents = new ScreeningEventsModel();
            this.filmOrder = [];
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
        this.dateList = results;
    }

    public async changeConditions() {
        if (this.movieTheater === '' && this.movieTheater === '') {
            return;
        }
        this.isLoading = true;
        try {
            await this.fitchPerformances();
            this.isLoading = false;
        } catch (err) {
            this.router.navigate(['/error', { redirect: '/purchase' }]);
            console.log(err);
        }
    }

    public async fitchMovieTheaters() {
        const url = `${environment.ticketingSite}/purchase/performances/getMovieTheaters`;
        const body = {};
        const response = await this.http.post<any>(url, body).retry(3).toPromise();
        if (response.error !== null) {
            throw new Error(response.error);
        }
        this.movieTheaters = response.result;
    }

    public async fitchPerformances() {
        const url = `${environment.ticketingSite}/purchase/performances/getPerformances`;
        const body = {
            theater: this.movieTheater,
            day: this.date
        };
        const response = await this.http.post<any>(url, body).retry(3).toPromise();
        if (response.error !== null) {
            throw new Error(response.error);
        }
        this.screeningEvents.individualScreeningEvents = response.result;
        this.filmOrder = this.screeningEvents.convertToFilmOrder();
    }

}
