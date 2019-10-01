import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as moment from 'moment';
import { UtilService } from '../services';
import { SasakiService } from '../services/sasaki.service';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class ProgramMembershipGuardService implements CanActivate {

    constructor(
        private router: Router,
        private sasaki: SasakiService,
        private user: UserService,
        private util: UtilService
    ) { }

    /**
   * 認証
   * @method canActivate
   */
    public async canActivate() {
        if (this.user.data.programMembershipOwnershipInfos === undefined) {
            this.user.data.programMembershipOwnershipInfos = [];
        }
        const now = (await this.util.getServerTime()).date;
        let programMembershipOwnershipInfos =
            this.user.data.programMembershipOwnershipInfos.filter(p => moment(p.ownedThrough).unix() > moment(now).unix());
        if (programMembershipOwnershipInfos.length > 0) {
            return true;
        }
        await this.sasaki.getServices();
        const result =
            await this.sasaki.ownerShip.search<'ProgramMembership'>({
                id: 'me',
                typeOfGood: {
                    typeOf: 'ProgramMembership'
                }
            });
        programMembershipOwnershipInfos =
            result.data.filter(p => moment(p.ownedThrough).unix() > moment(now).unix());
        if (programMembershipOwnershipInfos.length === 0) {
            this.router.navigate(['/auth/register/credit']);

            return false;
        }

        this.user.data.programMembershipOwnershipInfos = programMembershipOwnershipInfos;
        this.user.save();

        return true;
    }

}
