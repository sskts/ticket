import { factory } from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';

/**
 * 窓口判定（上映開始10分前から上映開始10分後）
 */
export function isWindow(screeningEvent: factory.chevre.event.screeningEvent.IEvent) {
    return (screeningEvent.remainingAttendeeCapacity !== undefined
        && screeningEvent.remainingAttendeeCapacity > 0
        && moment(screeningEvent.startDate).add(-10, 'minutes').unix() < moment().unix()
        && moment(screeningEvent.startDate).add(10, 'minutes').unix() > moment().unix());
}

/**
 * 予約期間前判定
 */
export function isBeforePeriod(screeningEvent: factory.chevre.event.screeningEvent.IEvent) {
    return screeningEvent.coaInfo === undefined
        || moment(screeningEvent.coaInfo.rsvStartDate).unix() > moment().unix();
}

/**
 * 予約期間後判定（上映開始10分以降）
 */
export function isAfterPeriod(screeningEvent: factory.chevre.event.screeningEvent.IEvent) {
    return screeningEvent.coaInfo === undefined
        || moment(screeningEvent.startDate).add(10, 'minutes').unix() < moment().unix();
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
        && screeningEvent.remainingAttendeeCapacity >= 0;
}
