import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BsModalService } from 'ngx-bootstrap';
import { ApplicationStatus } from '../models/util';
import { AlertModalComponent } from '../modules/shared/components/parts/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from '../modules/shared/components/parts/confirm-modal/confirm-modal.component';

@Injectable({
    providedIn: 'root',
})
export class UtilService {
    constructor(private modal: BsModalService, private http: HttpClient) {}

    /**
     * スリープ
     */
    public async sleep(time: number) {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    }

    /**
     * サーバータイム取得
     */
    public async getServerTime() {
        const result = await this.http
            .get<{ date: string }>(
                `/api/serverTime?date=${moment().toISOString()}`
            )
            .toPromise();

        return result;
    }

    /**
     * アプリステータス取得
     */
    public async getApplicationStatus() {
        const result = await this.http
            .get<{
                status: ApplicationStatus;
            }>(`/api/application/status?date=${moment().toISOString()}`)
            .toPromise();

        return result;
    }

    /**
     * json取得
     */
    public async getJson<T>(
        url: string,
        options?: {
            headers?:
                | HttpHeaders
                | {
                      [header: string]: string | string[];
                  };
            observe?: 'body';
            params?:
                | HttpParams
                | {
                      [param: string]: string | string[];
                  };
            reportProgress?: boolean;
            responseType?: 'json';
            withCredentials?: boolean;
        }
    ) {
        const result = await this.http.get<T>(url, options).toPromise();

        return result;
    }

    /**
     * text取得
     */
    public async getText(
        url: string,
        options?: {
            headers?:
                | HttpHeaders
                | {
                      [header: string]: string | string[];
                  };
            observe?: 'body';
            params?:
                | HttpParams
                | {
                      [param: string]: string | string[];
                  };
            reportProgress?: boolean;
            responseType?: 'json';
            withCredentials?: boolean;
        }
    ) {
        const result = await this.http
            .get<string>(url, { ...options, responseType: <any>'text' })
            .toPromise();

        return result;
    }

    /**
     * 警告モーダル表示
     */
    public openAlert(params: { title?: string; body?: string }) {
        const modalRef = this.modal.show(AlertModalComponent, {
            initialState: { ...params },
            class: 'modal-dialog-centered',
        });
        modalRef.content.modal = modalRef;
    }

    /**
     * 確認モーダル表示
     */
    public openConfirm(params: {
        title?: string;
        body: string;
        next?: string;
        prev?: string;
        cb: Function;
    }) {
        this.modal.show(ConfirmModalComponent, {
            initialState: { ...params },
            class: 'modal-dialog-centered',
        });
    }
}
