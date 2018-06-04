/**
 * SelectService
 */
import { Injectable } from '@angular/core';
import { SaveType, StorageService } from '../storage/storage.service';

export interface IPurchaseConditions {
    theater: string;
    date: string;
    sort: PurchaseSort;
}

export interface IData {
    purchase: IPurchaseConditions;
}

export enum PurchaseSort {
    Film = 'film',
    Time = 'time'
}

const STORAGE_KEY = 'select';

@Injectable()
export class SelectService {
    public data: IData;

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
        if (this.data === undefined || this.data === null) {
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
