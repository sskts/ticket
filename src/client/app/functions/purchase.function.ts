import { factory } from '@cinerino/sdk';
import { Performance } from '../models/performance';
import { IMovie, ISchedule } from '../models/schedule';


/**
 * サービス区分判定
 */
export function isScreeningServiceType(
    screeningEvent: factory.chevre.event.screeningEvent.IEvent,
    serviceType: 'first' | 'late'
) {
    if (screeningEvent.coaInfo === undefined
        || screeningEvent.coaInfo.kbnService === undefined
        || screeningEvent.coaInfo.kbnService.kubunCode === undefined) {
        return false;
    }
    const kubunCode = screeningEvent.coaInfo.kbnService.kubunCode;
    if (serviceType === 'first') {
        return (kubunCode === '001');
    } else if (serviceType === 'late') {
        return (kubunCode === '002' && screeningEvent.coaInfo.theaterCode.slice(-2) !== '20');
    } else {
        return false;
    }
}

/**
 * スケジュールからパフォーマンスへ変換
 */
export function schedule2Performance(schedule: ISchedule, member: boolean) {
    const performances: Performance[] = [];
    const date = schedule.date;
    schedule.movie.forEach((movie) => {
        movie.screen.forEach((screen) => {
            screen.time.forEach((time) => {
                performances.push(new Performance({ date, movie, screen, time, member }));
            });
        });
    });
    const sortResult = performances.sort((a, b) => {
        if (a.time.start_time < b.time.start_time) {
            return -1;
        } else {
            return 1;
        }
    });
    return sortResult;
}

/**
 * パフォーマンスを作品で絞り込み
 */
export function filterPerformancebyMovie(
    performances: Performance[],
    movie: IMovie) {
    const filterResult =
        performances.filter(p => {
            return (p.movie.movie_short_code === movie.movie_short_code
                && p.movie.movie_branch_code === movie.movie_branch_code);
        });
    const sortResult = filterResult.sort((a, b) => {
        if (a.time.start_time < b.time.start_time) {
            return -1;
        } else {
            return 1;
        }
    });
    return sortResult;
}


/**
 * 表示可能パフォーマンス判定
 */
export function hasDisplayPerformance(
    performances: Performance[],
    movie: IMovie) {
    const target = filterPerformancebyMovie(performances, movie);
    const filterResult = target.filter(p => p.isDisplay());
    return filterResult.length > 0;
}
