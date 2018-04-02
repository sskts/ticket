import { Injectable } from '@angular/core';
import { SaveType, StorageService } from '../storage/storage.service';

const STORAGE_KEY = 'user';

@Injectable()
export class UserService {

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
        const data: IData | null = this.storage.load(STORAGE_KEY, SaveType.Local);
        if (data === null) {
            this.data = {
                memberType: MemberType.NotMember
            };

            return;
        }
        this.data = data;
    }

    /**
     * 保存
     * @method save
     */
    public save() {
        this.storage.save(STORAGE_KEY, this.data, SaveType.Local);
    }

    /**
     * リセット
     * @method reset
     */
    public reset() {
        this.data = {
            memberType: MemberType.NotMember
        };
        this.save();
    }

    /**
     * 会員判定
     */
    public isMember() {
        return (this.data.memberType === MemberType.Member);
    }

}

export interface IData {
    memberType: MemberType;
}

export enum MemberType {
    NotMember = '0',
    Member = '1'
}
