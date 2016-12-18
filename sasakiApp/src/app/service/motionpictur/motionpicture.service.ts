import { Injectable } from '@angular/core';
import { Http, Request, Response } from '@angular/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class MotionpictureService {
    private endpoint: string;

    constructor(private http: Http) {

    }

    /**
     * 劇場詳細
     */
    public getTheaterInfo(theaterCode: string) {
        return this.http.request(new Request({
            method: 'post',
            url: `${this.endpoint}/theater/${theaterCode}`
        }));
    }

    /**
     * 作品リスト(劇場指定)
     */
    public getFilms() {
        return this.http.request(new Request({
            method: 'post',
            url: `${this.endpoint}//films`
        }));
    }

    /**
     * パフォーマンスリスト(劇場指定)
     */
    public getPerformances() {
        return this.http.request(new Request({
            method: 'post',
            url: `${this.endpoint}/performances`
        }));
    }

    /**
     * スクリーンリスト(劇場指定)
     */
    public getScreens() {
        return this.http.request(new Request({
            method: 'post',
            url: `${this.endpoint}/screens`
        }));
    }

    /**
     * 券種リスト(劇場指定)
     */
    // public get() {
    //     return this.http.request(new Request({
    //         method: 'post',
    //         url: `${this.endpoint}/`
    //     }));
    // }

}
