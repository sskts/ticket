import * as moment from 'moment';
import { environment } from '../../environments/environment';
import { IMovie, IScreen, ITime } from './schedule';

/**
 * パフォーマンス
 */
export class Performance {
    public date: string;
    public movie: IMovie;
    public screen: IScreen;
    public time: ITime;
    public member: boolean;

    constructor(params: {
        date: string;
        movie: IMovie,
        screen: IScreen,
        time: ITime,
        member?: boolean
    }) {
        this.date = params.date;
        this.movie = params.movie;
        this.screen = params.screen;
        this.time = params.time;
        this.member = (params.member === undefined) ? false : params.member;
    }

    /**
     * 予約ステータス情報取得
     */
    public getAvailability() {
        const value = this.time.seat_count.cnt_reserve_free / this.time.seat_count.cnt_reserve_max * 100;
        const availability = [
            { symbolText: '×', image: '/assets/images/icon/vacancy_full_white.svg', className: 'vacancy-full', text: '満席' },
            { symbolText: '△', image: '/assets/images/icon/vacancy_little_white.svg', className: 'vacancy-little', text: '購入' },
            { symbolText: '○', image: '/assets/images/icon/vacancy_large_white.svg', className: 'vacancy-large', text: '購入' }
        ];
        const threshold = 10;

        return (value === 0)
            ? availability[0] : (value <= threshold)
                ? availability[1] : availability[2];
    }

    /**
     * 販売可能判定
     */
    public isSalse() {
        return !this.isBeforePeriod()
            && !this.isAfterPeriod()
            && !this.isWindow()
            && this.time.seat_count.cnt_reserve_free > 0;
    }

    /**
     * 予約期間前判定
     */
    public isBeforePeriod() {
        const rsvStartDate = (this.member)
            ? moment(`${this.time.member_rsv_start_day} ${this.time.member_rsv_start_time}`, 'YYYYMMDD HHmm')
            : moment(`${this.time.rsv_start_day} ${this.time.rsv_start_time}`, 'YYYYMMDD HHmm');
        return rsvStartDate > moment();
    }

    /**
     * 予約期間後判定（上映開始10分以降）
     */
    public isAfterPeriod() {
        const startDate =
            moment(`${this.date} ${this.time.start_time}`, 'YYYYMMDD HHmm');
        return moment(startDate).add(10, 'minutes') < moment();
    }

    /**
     * 窓口判定（上映開始10分前から上映開始10分後）
     */
    public isWindow() {
        const startDate =
            moment(`${this.date} ${this.time.start_time}`, 'YYYYMMDD HHmm');
        const now = moment();
        return (this.time.seat_count.cnt_reserve_free > 0
            && moment(startDate).add(
                Number(environment.WINDOW_TIME_FROM_VALUE),
                (<moment.DurationInputArg2>environment.WINDOW_TIME_FROM_UNIT)
            ) < now
            && moment(startDate).add(
                Number(environment.WINDOW_TIME_THROUGH_VALUE),
                (<moment.DurationInputArg2>environment.WINDOW_TIME_THROUGH_UNIT)
            ) > now);
    }

    /**
     * 表示判定
     */
    public isDisplay() {
        const now = moment();
        const displayStartDate = moment(this.time.online_display_start_day, 'YYYYMMDD');
        const endDate = (this.time.start_time < this.time.end_time)
            ? moment(this.date + ' ' + this.time.end_time, 'YYYYMMDD HHmm')
            : moment(this.date + ' ' + this.time.end_time, 'YYYYMMDD HHmm').add(1, 'days');
        return (displayStartDate < now && endDate > now);
    }

    /**
     * 上映時間取得
     */
    public getTime(type: 'start' | 'end') {
        return (type === 'start')
            ? `${this.time.start_time.slice(0, 2)}:${this.time.start_time.slice(2, 4)}`
            : `${this.time.end_time.slice(0, 2)}:${this.time.end_time.slice(2, 4)}`;
    }

    /**
     * id生成
     */
    public createId() {
        const id = `${this.movie.movie_short_code}${this.movie.movie_branch_code}${this.date}${this.screen.screen_code}${this.time.start_time}`;
        return id;
    }

}
