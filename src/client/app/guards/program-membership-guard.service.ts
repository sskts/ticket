import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import * as moment from 'moment';
import { UtilService } from '../services';
import { CinerinoService } from '../services/cinerino.service';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root',
})
export class ProgramMembershipGuardService implements CanActivate {
    constructor(
        private router: Router,
        private cinerinoService: CinerinoService,
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
        await this.cinerinoService.getServices();
        const searchResult = await this.userService.searchMyMemberships();
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
        programMembershipOwnershipInfos: factory.ownershipInfo.IOwnershipInfo<factory.permit.IPermit>[]
    ) {
        const now = (await this.utilService.getServerTime()).date;
        const filterResult = programMembershipOwnershipInfos.filter(
            (p) => moment(p.ownedThrough).unix() > moment(now).unix()
        );
        return filterResult.length > 0;
    }
}
