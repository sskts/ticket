import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { UtilService } from '../services';
import { ApplicationStatus } from '../models/util';

@Injectable({
    providedIn: 'root',
})
export class statusGuardService implements CanActivate {
    constructor(private router: Router, private utilService: UtilService) {}

    /**
     * 認証
     * @method canActivate
     */
    public async canActivate(
        _activatedRouteSnapshot: ActivatedRouteSnapshot,
        routerStateSnapshot: RouterStateSnapshot
    ) {
        try {
            const { status } = await this.utilService.getApplicationStatus();
            if (status === ApplicationStatus.MEMBERSHIP_COUPON_CLOSE) {
                if (routerStateSnapshot.url.match(/^\/purchase/) !== null) {
                    this.router.navigate(['/purchase/close']);
                }
                if (routerStateSnapshot.url.match(/^\/ticket/) !== null) {
                    this.router.navigate(['/ticket/close']);
                }
                if (routerStateSnapshot.url.match(/^\/movie/) !== null) {
                    this.router.navigate(['/movie/close']);
                }
                if (routerStateSnapshot.url.match(/^\/member/) !== null) {
                    this.router.navigate(['/member/mypage/close']);
                }
                return false;
            }
            return true;
        } catch (error) {
            this.router.navigate(['/error', { redirect: '/' }]);
            return false;
        }
    }
}
