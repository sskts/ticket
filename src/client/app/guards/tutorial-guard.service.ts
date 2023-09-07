import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SaveType, StorageService } from '../services/storage.service';
import { UtilService } from '../services';
import { ApplicationStatus } from '../models/util';

@Injectable({
    providedIn: 'root',
})
export class TutorialGuardService implements CanActivate {
    constructor(
        private router: Router,
        private storage: StorageService,
        private utilService: UtilService
    ) {}

    /**
     * 認証
     * @method canActivate
     */
    public async canActivate() {
        try {
            const device = this.storage.load('device', SaveType.Local);
            if (device === null || !device.tutorial) {
                const { status } =
                    await this.utilService.getApplicationStatus();
                if (status !== ApplicationStatus.MEMBERSHIP_COUPON_CLOSE) {
                    this.router.navigate(['/tutorial']);

                    return false;
                }
            }
            return true;
        } catch (error) {
            this.router.navigate(['/error', { redirect: '/' }]);
            return false;
        }
    }
}
