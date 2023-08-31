import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as moment from 'moment';
import { SaveType, StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';
import { UtilService } from '../services/util.service';
import { ApplicationStatus } from '../models/util';

interface PointAccountMutex {
    expire: number;
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
        try {
            const { status } = await this.utilService.getApplicationStatus();
            if (status === ApplicationStatus.MEMBERSHIP_COUPON_CLOSE) {
                return true;
            }
        } catch (error) {
            this.router.navigate(['/error']);
            return false;
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
            if (accounts.length > 1) {
                // ポイントアカウントが複数存在する場合、最初の一件を残してクローズする
                await this.userService.closeUnnecessaryPointAccount({
                    accounts,
                });
            }
            return true;
        } catch (error) {
            this.storageService.remove(POINT_ACCOUNT_MUTEX_KEY, SaveType.Local);
            this.router.navigate(['/error']);
            return false;
        }
    }
}
