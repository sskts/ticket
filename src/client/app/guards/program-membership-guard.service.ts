import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import * as moment from 'moment';
import { UtilService } from '../services';
import { CinerinoService } from '../services/cinerino.service';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class ProgramMembershipGuardService implements CanActivate {

    constructor(
        private router: Router,
        private cinerino: CinerinoService,
        private user: UserService,
        private util: UtilService
    ) { }

    /**
   * 認証
   * @method canActivate
   */
    public async canActivate() {
        if (!this.user.isMember()) {
            // 非会員
            return true;
        }
        if (this.user.data.userName !== undefined
            && this.user.data.userName !== '') {
            // ユーザーネーム保存
            this.user.data.prevUserName = this.user.data.userName;
        }
        this.user.save();
        if (await this.hasAvailability(this.user.data.programMembershipOwnershipInfos)) {
            // 期限内会員
            // プログラムメンバーシップ登録済み判定を保存
            this.user.data.programMembershipRegistered = true;
            this.user.save();
            return true;
        }
        await this.cinerino.getServices();
        const searchResult = await this.cinerino.ownerShipInfo.search({
            typeOfGood: {
                typeOf: factory.chevre.programMembership.ProgramMembershipType.ProgramMembership
            }
        });
        if (searchResult.data.length > 0) {
            // プログラムメンバーシップ登録済み判定を保存
            this.user.data.programMembershipRegistered = true;
            this.user.save();
        }
        if (!await this.hasAvailability(<factory.ownershipInfo.IOwnershipInfo<
            factory.chevre.programMembership.IProgramMembership>[]
            >searchResult.data)) {
            // 期限切れ会員
            this.router.navigate(['/auth/register/credit']);
            return false;
        }
        // プログラムメンバーシップを保存
        this.user.data.programMembershipOwnershipInfos = <factory.ownershipInfo.IOwnershipInfo<
            factory.chevre.programMembership.IProgramMembership>[]>searchResult.data;
        this.user.save();

        return true;
    }

    /**
     * 有効判定
     */
    private async hasAvailability(programMembershipOwnershipInfos:
        factory.ownershipInfo.IOwnershipInfo<factory.chevre.programMembership.IProgramMembership>[]) {
        const now = (await this.util.getServerTime()).date;
        const filterResult = programMembershipOwnershipInfos
            .filter(p => moment(p.ownedThrough).unix() > moment(now).unix());
        return (filterResult.length > 0);
    }

}
