import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { UtilService } from '../util.service';

@Injectable({
    providedIn: 'root',
})
export class Base {
    protected endpoint: string;
    protected projectId: string;
    protected accessToken: string;

    constructor(
        protected http: HttpClient,
        protected utilService: UtilService
    ) {}

    public setOption(params: {
        endpoint: string;
        projectId: string;
        accessToken: string;
    }) {
        this.endpoint = params.endpoint;
        this.projectId = params.projectId;
        this.accessToken = params.accessToken;
    }
}
