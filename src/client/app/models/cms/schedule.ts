export interface ISchedule {
    id: number;
    start_date: string;
    end_date: string;
    remark: string;
    title: ITitle;
    formats: IFormat[];
    theaters: ITheater[];
}

export interface ITheater {
    id: number;
    name: string;
    name_ja: string;
    coa_code: string;
}

export interface IFormat {
    system: string;
    sound: string;
    voice: string;
}

export interface ITitle {
    id: number;
    name: string;
    image: string;
    credit: string;
    catchcopy: string;
    introduction: string;
    director: string;
    cast: string;
    official_site: string;
    rating: string;
    universal: string[];
}
