import { Injectable } from '@angular/core';
import { Http, Request, Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface performancesResult {
    success: boolean,
    performances: performance[]
}

export interface name {
    'en': string,
    'ja': string
}

export interface performance {
    '__v': number,
    '_id': string,
    'created_at': Date,
    'day': string,
    'film': {
        '_id': string,
        'minutes': number,
        'name': name
    },
    'screen': string,
    'screen_name': name,
    'theater': string,
    'theater_name': name,
    'time_end': string,
    'time_start': string,
    'updated_at': Date
}

@Injectable()
export class MotionpictureService {
    private endpoint: string;

    constructor(private http: Http) {
        let config: any = environment;
        this.endpoint = config['end_point'];
    }

    /**
     * パフォーマンスリスト
     */
    public getPerformances(day: string): Observable<performancesResult> {
        let method: string = 'performances';
        let url: string = `${this.endpoint}/${method}/?day=${day}`;
        
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    // レスポンスデータの整形処理
    private extractData(res: Response): any {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body || {};
    }

    // エラー処理
    private handleError(error: any) {
        let errMsg = error.message || 'Server error';
        return Observable.throw(errMsg);
    }

}
