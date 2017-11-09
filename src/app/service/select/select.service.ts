/**
 * SelectService
 */
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

export interface ISelect {
    purchase: IPurchaseSelect;
}

export interface IPurchaseSelect {
    theater: string;
    date: string;
}

@Injectable()
export class SelectService {
    public select: ISelect;

    constructor(private storage: StorageService) { }

    public getSelect(): ISelect {
        if (this.select === undefined) {
            this.select = this.storage.load('select');
        }
        if (this.select === undefined || this.select === null) {
            this.select = {
                purchase: {
                    theater: '',
                    date: ''
                }
            };
        }

        return this.select;
    }

    public save(): void {
        if (this.select === undefined) {
            this.getSelect();
        }

        this.storage.save('select', this.select);
    }

}
