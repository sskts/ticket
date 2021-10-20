export interface IScheduleData {
    schedule: ISchedule[];
    maintenance: { message?: string };
}

export interface ISchedule {
    date: string;
    name_service_day: string;
    movie: IMovie[];
}

export interface IMovie {
    sort_no: number;
    movie_code: string;
    movie_short_code: string;
    movie_branch_code: string;
    name: string;
    ename: string;
    cname: string;
    joueihousiki: string;
    comment: string;
    running_time: number;
    cm_time: number;
    official_site: string;
    summary: string;
    screen: IScreen[];
}

export interface IScreen {
    screen_code: string;
    name: string;
    time: ITime[];
}

export interface ITime {
    appear_popup?: string;
    start_time: string;
    end_time: string;
    only_window_sale_start_time: string;
    online_display_start_day: string;
    rsv_start_day: string;
    rsv_start_time: string;
    member_rsv_start_day: string;
    member_rsv_start_time: string;
    url: string;
    late: number;
    is_only_window_sale: string;
    seat_count: ISeatCount;
}

export interface ISeatCount {
    cnt_reserve_max: number;
    cnt_reserve_free: number;
}
