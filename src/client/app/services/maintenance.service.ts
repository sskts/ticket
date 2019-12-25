import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

export interface IConfirm {
    isMaintenance: boolean;
    maintenanceText: string;
    startDate: string;
    endDate: string;
}

@Injectable({
    providedIn: 'root'
})
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

}
