/**
 * SelectService
 */
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

export interface IPurchaseConditions {
    theater: string;
    date: string;
    sort: PurchaseSort;
}

export interface ISelect {
    purchase: IPurchaseConditions;
}

export enum PurchaseSort {
    Film = 'film',
    Time = 'time'
}

@Injectable()
export class SelectService {
    public data: ISelect;

    constructor(private storage: StorageService) { }

    public getSelect(): ISelect {
        if (this.data === undefined) {
            this.data = this.storage.load('select');
        }
        if (this.data === undefined || this.data === null) {
            this.data = {
                purchase: {
                    theater: '',
                    date: '',
                    sort: PurchaseSort.Film
                }
            };
        }

        return this.data;
    }

    public save(): void {
        if (this.data === undefined) {
            this.getSelect();
        }

        this.storage.save('select', this.data);
    }

}
