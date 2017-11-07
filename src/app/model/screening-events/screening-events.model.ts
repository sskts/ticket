/**
 * ScreeningEventsModel
 */
import * as sasaki from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';

export type IIndividualScreeningEvent = sasaki.factory.event.individualScreeningEvent.IEventWithOffer;

export interface IFilmOrder {
    id: string;
    films: IIndividualScreeningEvent[];
}

/**
 * 販売終了時間 30分前
 */
const END_TIME = 30;

export class ScreeningEventsModel {
    public individualScreeningEvents: IIndividualScreeningEvent[];

    constructor(args?: any) {
        if (args === undefined) {
            args = {};
        }
        this.individualScreeningEvents = (args.individualScreeningEvents === undefined) ? [] : args.individualScreeningEvents;
    }

    /**
     * 時間別へ変換
     * @function getEventByChronologicalOrder
     * @returns {chronological[]}
     */
    public getEventByChronologicalOrder() {
        return this.individualScreeningEvents.filter((performance) => {
            // 販売可能時間判定
            return this.isSalse(performance.startDate);
        });
    }
    /**
     * 作品別へ変換
     * @function getEventByFilmOrder
     * @returns {IFilmOrder[]}
     */
    public getEventByFilmOrder() {
        const results: IFilmOrder[] = [];
        this.individualScreeningEvents.forEach((performance) => {
            // 販売可能時間判定
            if (!this.isSalse(performance.startDate)) {
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
     * 販売可能判定
     * @param {Date | string} startDate
     * @returns {boolean}
     */
    private isSalse(startDate: Date | string): boolean {
        return (moment().unix() < moment(startDate).subtract(END_TIME, 'minutes').unix())
    }
}
