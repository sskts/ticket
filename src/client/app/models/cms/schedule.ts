export enum System {
    '2D' = 1,
    '3D' = 2,
    '4DX' = 3,
    '4DX3D' = 4,
    'IMAX' = 5,
    'IMAX3D' = 6,
    'ScreenX' = 7,
    '4DXSCREEN' = 8,
    'None' = 99,
}

export enum Sound {
    'BESTIA' = 1,
    'Dts-X' = 2,
    'Dolbyatmos' = 3,
    'GDC' = 4,
    'None' = 99,
}

export enum Voice {
    'Subtitles' = 1,
    'Dubbing' = 2,
    'None' = 3,
}

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
    system_id: System;
    system_name: string;
    sound_id: Sound;
    sound_name: string;
    voice_id: Voice;
    voice_name: string;
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
