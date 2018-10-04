import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

export interface IConfirm {
    isMaintenance: boolean;
    maintenanceText: string;
    startDate: string;
    endDate: string;
}

export interface IExcludeTheaters {
    isExclude: boolean;
    theaters: string[];
}

@Injectable()
export class MaintenanceService {

    constructor(
        private http: HttpClient
    ) { }

    public async confirm() {
        const options = {};
        const url = '/api/maintenance/confirm';
        const result = await this.http.get<IConfirm>(url, options).toPromise();

        return result;
    }

    public async excludeTheaters() {
        const options = {};
        const url = '/api/maintenance/excludeTheaters';
        const result = await this.http.get<IExcludeTheaters>(url, options).toPromise();

        return result;
    }

}
