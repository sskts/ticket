/**
 * ScheduleService
 */
import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import * as sasaki from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';
// tslint:disable:no-import-side-effect
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import { StorageService } from '../storage/storage.service';

export type IMovieTheater = sasaki.factory.organization.movieTheater.IOrganizationWithoutGMOInfo;
export type IIndividualScreeningEvent = sasaki.factory.event.individualScreeningEvent.IEventWithOffer;
export interface IFilmOrder {
    id: string;
    films: IIndividualScreeningEvent[];
}
export interface ISchedule {
    schedule: {
        theater: IMovieTheater;
        schedule: {
            date: string;
            individualScreeningEvents: IIndividualScreeningEvent[];
        }[];
    }[];
    expired: number;
}
export interface IDate {
    value: string;
    displayText: string;
    serviceDay: string;
}

/**
 * 先行販売
 */
const PRE_SALE = '1';

@Injectable()
export class ScheduleService {
    public schedule: ISchedule;

    constructor(
        private jsonp: Jsonp,
        private storage: StorageService
    ) { }

    /**
     * スケジュール取得
     * @method getSchedule
     * @returns {Promise<ISchedule>}
     */
    public async getSchedule(): Promise<ISchedule> {
        const schedule: ISchedule = (this.schedule === undefined)
            ? this.storage.load('schedule')
            : this.schedule;
        if (schedule === undefined || schedule === null || schedule.expired < moment().unix()) {
            try {
                this.schedule = await this.fitchSchedule({
                    beginDate: moment().format('YYYYMMDD'),
                    endDate: moment().add(1, 'month').format('YYYYMMDD')
                });
                this.storage.save('schedule', this.schedule);
            } catch (err) {
                this.storage.remove('schedule');
                throw err;
            }
        } else {
            this.schedule = schedule;
        }

        return this.schedule;
    }

    /**
     * スケジュールをAPI経由で取得
     * @method fitchISchedule
     * @returns {Promise<void>}
     */
    public async fitchSchedule(args: { beginDate: string; endDate: string; }): Promise<ISchedule> {
        const url = `${environment.ticketingSite}/purchase/performances/getSchedule`;
        const options = {
            search: {
                callback: 'JSONP_CALLBACK',
                beginDate: args.beginDate,
                endDate: args.endDate
            }
        };
        const response = await this.jsonp.get(url, options).retry(3).toPromise();
        if (response.json().error !== null) {
            throw new Error(response.json().error);
        }
        const expired = 10;

        return {
            schedule: response.json().result,
            expired: moment().add(expired, 'minutes').unix()
        };
    }

    /**
     * 劇場取得
     * @method getTheater
     * @returns {<IMovieTheater[]}
     */
    public getTheater(): IMovieTheater[] {
        if (this.schedule === undefined) {
            throw new Error('schedule is undefined');
        }

        return this.schedule.schedule.map((schedule) => {
            return schedule.theater;
        });
    }

    /**
     * 日付取得
     * @method getDate
     * @returns {IDate[]}
     */
    public getDate(theaterCode: string): IDate[] {
        if (this.schedule === undefined) {
            throw new Error('schedule is undefined');
        }

        const theaterSchedule = this.schedule.schedule.find((schedule) => {
            return (schedule.theater.location.branchCode === theaterCode);
        });

        const dateList = theaterSchedule.schedule.filter((schedule) => {
            const screeningEvents = schedule.individualScreeningEvents.filter((screeningEvent) => {
                return (screeningEvent.coaInfo.rsvStartDate <= moment().format('YYYYMMDD')
                    || screeningEvent.coaInfo.flgEarlyBooking === PRE_SALE);
            });

            return (screeningEvents.length > 0);
        });

        let count = 0;

        return dateList.map((schedule) => {
            const formatDate = moment(schedule.date).format('YYYY年MM月DD日');
            const result = {
                value: schedule.date,
                displayText: (count === 0) ? `本日 (${formatDate})`
                    : (count === 1) ? `明日 (${formatDate})`
                        : (count === 2) ? `明後日 (${formatDate})` : formatDate,
                serviceDay: schedule.individualScreeningEvents[0].coaInfo.nameServiceDay
            };
            count += 1;

            return result;
        });
    }

    /**
     * 作品別上映スケジュール取得
     * @function getScreeningEvents
     * @returns {Promise<IFilmOrder[]>}
     */
    public async getScreeningEvents(args: { theater: string, date: string }): Promise<IFilmOrder[]> {
        if (this.schedule === undefined) {
            throw new Error('schedule is undefined');
        }
        const results: IFilmOrder[] = [];
        const theaterSchedule = this.schedule.schedule.find((schedule) => {
            return (schedule.theater.location.branchCode === args.theater);
        });
        const dateSchedule = theaterSchedule.schedule.find((schedule) => {
            return (schedule.date === args.date);
        });

        const screeningEvents = dateSchedule.individualScreeningEvents.filter((screeningEvent) => {
            return (screeningEvent.coaInfo.rsvStartDate <= moment().format('YYYYMMDD')
                || screeningEvent.coaInfo.flgEarlyBooking === PRE_SALE);
        });

        screeningEvents.forEach((performance) => {
            // 販売可能時間判定
            if (!this.isSalseTime(performance.startDate)) {
                return;
            }
            const film = results.find((event) => {
                return (event.id === performance.workPerformed.identifier);
            });
            if (film === undefined) {
                results.push({
                    id: performance.workPerformed.identifier,
                    films: [performance]
                });
            } else {
                film.films.push(performance);
            }
        });

        return results;
    }

    /**
     * 販売可能時間判定
     * @param {Date | string} startDate
     * @returns {boolean}
     */
    private isSalseTime(startDate: Date | string): boolean {
        const END_TIME = 30;

        return (moment().unix() < moment(startDate).subtract(END_TIME, 'minutes').unix());
    }

}
