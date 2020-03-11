import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { factory } from '@cinerino/api-javascript-client';
import * as moment from 'moment';
import { UtilService } from '../services';
import { CinerinoService } from '../services/cinerino.service';
import { UserService } from '../services/user.service';

type programMembershipType =
    factory.ownershipInfo.IOwnershipInfo<factory.ownershipInfo.IGood<factory.programMembership.ProgramMembershipType.ProgramMembership>>;

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
            return true;
        }
        if (await this.hasAvailability(this.user.data.programMembershipOwnershipInfos)) {
            return true;
        }
        await this.cinerino.getServices();
        const searchResult = await this.cinerino.ownerShipInfo.search({
            typeOfGood: {
                typeOf: factory.programMembership.ProgramMembershipType.ProgramMembership
            }
        });
        if (!await this.hasAvailability(searchResult.data)) {
            this.router.navigate(['/auth/register/credit']);
            return false;
        }

        this.user.data.programMembershipOwnershipInfos = searchResult.data;
        this.user.save();

        return true;
    }

    /**
     * 有効判定
     */
    private async hasAvailability(programMembershipOwnershipInfos: programMembershipType[]) {
        const now = (await this.util.getServerTime()).date;
        const filterResult = programMembershipOwnershipInfos
            .filter(p => moment(p.ownedThrough).unix() > moment(now).unix());
        return (filterResult.length > 0);
    }

}
