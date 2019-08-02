import { factory } from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';
import { environment } from '../../environments/environment';


/**
 * 窓口判定
 */
export function isWindow(screeningEvent: factory.chevre.event.screeningEvent.IEvent) {
    const window = {
        value: Number(environment.WINDOW_TIME_VALUE),
        unit: <moment.DurationInputArg2>environment.WINDOW_TIME_UNIT
    };
    return moment(screeningEvent.startDate).add(window.value, window.unit).unix() < moment().unix();
}

/**
 * 予約期間前判定
 */
export function isBeforePeriod(screeningEvent: factory.chevre.event.screeningEvent.IEvent) {
    return screeningEvent.coaInfo === undefined
        || moment(screeningEvent.coaInfo.rsvStartDate).unix() > moment().unix();
}

/**
 * 予約期間後判定
 */
export function isAfterPeriod(screeningEvent: factory.chevre.event.screeningEvent.IEvent) {
    return screeningEvent.coaInfo === undefined
        || moment(screeningEvent.endDate).unix() < moment().unix();
}

/**
 * 販売可能判定
 */
export function isSalse(screeningEvent: factory.chevre.event.screeningEvent.IEvent) {
    return screeningEvent.coaInfo !== undefined
        && !isBeforePeriod(screeningEvent)
        && !isAfterPeriod(screeningEvent)
        && !isWindow(screeningEvent)
        && screeningEvent.remainingAttendeeCapacity !== undefined
        && screeningEvent.remainingAttendeeCapacity > 0;
}
