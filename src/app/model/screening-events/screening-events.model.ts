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
        const results: IIndividualScreeningEvent[] = [];
        this.individualScreeningEvents.forEach((performance) => {
            // 販売可能時間判定
            const limitTime = moment().add(END_TIME, 'minutes');
            if (limitTime.unix() > moment(`${performance.startDate}`).unix()) {
                return;
            }
            results.push(performance);
        });

        return results;
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
            const limitTime = moment().add(END_TIME, 'minutes');
            if (limitTime.unix() > moment(`${performance.startDate}`).unix()) {
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
}
