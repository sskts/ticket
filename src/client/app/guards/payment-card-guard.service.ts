import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as moment from 'moment';
import { SaveType, StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';
import { UtilService } from '../services/util.service';

interface PointAccountMutex {
    expire: Number;
}

@Injectable({
    providedIn: 'root',
})
export class PaymentCardGuardService implements CanActivate {
    constructor(
        private storageService: StorageService,
        private router: Router,
        private userService: UserService,
        private utilService: UtilService
    ) {}

    /**
     * 認証
     * @method canActivate
     */
    public async canActivate() {
        if (!this.userService.isMember()) {
            // 非会員
            return true;
        }
        if (
            this.userService.data.userName !== undefined &&
            this.userService.data.userName !== ''
        ) {
            // ユーザーネーム保存
            this.userService.data.prevUserName = this.userService.data.userName;
        }
        this.userService.save();
        const POINT_ACCOUNT_MUTEX_KEY = 'point_account_mutex';
        try {
            const limit = 50;
            for (let i = 0; i < limit; i++) {
                const now = moment().unix();
                const accountMutex: PointAccountMutex | null =
                    this.storageService.load(
                        POINT_ACCOUNT_MUTEX_KEY,
                        SaveType.Local
                    );
                if (accountMutex === null || accountMutex.expire < now) {
                    break;
                }
                await this.utilService.sleep(300);
            }
            const accounts =
                this.userService.data.accounts.length === 0
                    ? await this.userService.searchPointAccount()
                    : this.userService.data.accounts;
            if (accounts.length === 0) {
                const mutex: PointAccountMutex = {
                    expire: moment().add(15, 'seconds').unix(),
                };
                this.storageService.save(
                    POINT_ACCOUNT_MUTEX_KEY,
                    mutex,
                    SaveType.Local
                );
                await this.userService.openPointAccount();
                return false;
            }
            return true;
        } catch (error) {
            this.storageService.remove(POINT_ACCOUNT_MUTEX_KEY, SaveType.Local);
            this.router.navigate(['/error']);
            return false;
        }
    }
}
