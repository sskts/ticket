/**
 * PurchaseService
 */
import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import * as sasaki from '@motionpicture/sskts-api-javascript-client';
import { environment } from '../../../environments/environment';

type IMovieTheater = sasaki.factory.place.movieTheater.IPlaceWithoutScreeningRoom;
type IIndividualScreeningEvent = sasaki.factory.event.individualScreeningEvent.IEventWithOffer;
export interface ISchedule {
    theater: IMovieTheater;
    schedule: {
        date: string;
        individualScreeningEvents: IIndividualScreeningEvent[];
    }[];
}

@Injectable()
export class PurchaseService {
    public movieTheaters: IMovieTheater[];
    public schedule: ISchedule[];

    constructor(
        private jsonp: Jsonp
    ) {
        this.movieTheaters = [];
    }

    /**
     * 劇場一覧取得
     * @method getMovieTheaters
     * @returns {Promise<IPlaceWithoutScreeningRoom[]>}
     */
    public async getMovieTheaters() {
        if (this.movieTheaters.length === 0) {
            try {
                this.movieTheaters = await this.fitchMovieTheaters();
            } catch (err) {
                throw err;
            }
        }

        return this.movieTheaters;
    }

    /**
     * 劇場一覧をAPI経由で取得
     * @method fitchMovieTheaters
     * @returns {Promise<IPlaceWithoutScreeningRoom[]>}
     */
    public async fitchMovieTheaters() {
        const url = `${environment.ticketingSite}/purchase/performances/getMovieTheaters`;
        const options = {
            search: {
                callback: 'JSONP_CALLBACK'
            }
        };
        const response = await this.jsonp.get(url, options).retry(3).toPromise();
        console.log('response', response);
        if (response.json().error !== null) {
            throw new Error(response.json().error);
        }

        return response.json().result;
    }

    /**
     * スケジュール取得
     * @method getSchedule
     * @returns {Promise<IPlaceWithoutScreeningRoom[]>}
     */
    public async getSchedule(args: { biginDate: string; endDate: string; }) {
        if (this.movieTheaters.length === 0) {
            try {
                this.schedule = await this.fitchSchedule(args);
            } catch (err) {
                throw err;
            }
        }

        return this.schedule;
    }

    /**
     * スケジュールをAPI経由で取得
     * @method fitchISchedule
     * @returns {Promise<void>}
     */
    public async fitchSchedule(args: { biginDate: string; endDate: string; }): Promise<ISchedule[]> {
        const url = `${environment.ticketingSite}/purchase/performances/getSchedule`;
        const options = {
            search: {
                callback: 'JSONP_CALLBACK',
                biginDate: args.biginDate,
                endDate: args.endDate
            }
        };
        const response = await this.jsonp.get(url, options).retry(3).toPromise();
        if (response.json().error !== null) {
            throw new Error(response.json().error);
        }

        return response.json().result;
    }
}
