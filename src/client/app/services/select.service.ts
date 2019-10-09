/**
 * SelectService
 */
import { Injectable } from '@angular/core';
import { SaveType, StorageService } from './storage.service';

export interface IPurchaseConditions {
    theater: string;
    date: string;
    sort: PurchaseSort;
}

export interface ISelectData {
    purchase: IPurchaseConditions;
}

export enum PurchaseSort {
    Film = 'film',
    Time = 'time'
}

const STORAGE_KEY = 'select';

@Injectable({
    providedIn: 'root'
})
export class SelectService {
    public data: ISelectData;

    constructor(
        private storage: StorageService
    ) {
        this.load();
        this.save();
    }

    /**
     * 読み込み
     * @method load
     */
    public load() {
        const data = this.storage.load(STORAGE_KEY, SaveType.Local);
        if (data === undefined || data === null) {
            this.data = {
                purchase: {
                    theater: '',
                    date: '',
                    sort: PurchaseSort.Film
                }
            };

            return;
        }
        this.data = data;
    }

    /**
     * 保存
     * @method save
     */
    public save(): void {
        this.storage.save(STORAGE_KEY, this.data, SaveType.Local);
    }

}
