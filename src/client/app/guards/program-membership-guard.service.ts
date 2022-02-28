import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as moment from 'moment';
import { SmartTheaterService, UserService, UtilService } from '../services';
import { OwnershipInfoType } from '../services/smart-theater.service';

@Injectable({
    providedIn: 'root',
})
export class ProgramMembershipGuardService implements CanActivate {
    constructor(
        private router: Router,
        private smartTheaterService: SmartTheaterService,
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
            await this.hasAvailability(
                this.userService.data.programMembershipOwnershipInfos
            )
        ) {
            // 期限内会員
            // プログラムメンバーシップ登録済み判定を保存
            this.userService.data.programMembershipRegistered = true;
            this.userService.save();
            return true;
        }
        await this.smartTheaterService.getServices();
        const searchResult =
            await this.smartTheaterService.ownershipInfo.searchMemberships({
                page: 1,
            });
        if (searchResult.length > 0) {
            // プログラムメンバーシップ登録済み判定を保存
            this.userService.data.programMembershipRegistered = true;
            this.userService.save();
        }
        if (!(await this.hasAvailability(searchResult))) {
            // 期限切れ会員
            this.router.navigate(['/auth/register/credit']);
            return false;
        }
        // プログラムメンバーシップを保存
        this.userService.data.programMembershipOwnershipInfos = searchResult;
        this.userService.save();

        return true;
    }

    /**
     * 有効判定
     */
    private async hasAvailability(
        programMembershipOwnershipInfos: OwnershipInfoType.IMembership[]
    ) {
        const now = (await this.utilService.getServerTime()).date;
        const filterResult = programMembershipOwnershipInfos.filter(
            (p) => moment(p.ownedThrough).unix() > moment(now).unix()
        );
        return filterResult.length > 0;
    }
}
