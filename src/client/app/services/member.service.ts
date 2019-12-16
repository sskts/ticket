import { Injectable } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import * as moment from 'moment';
import { CinerinoService } from './cinerino.service';
import { UtilService } from './util.service';

@Injectable({
    providedIn: 'root'
})
export class MemberService {

    constructor(
        private cinerinoService: CinerinoService,
        private utilService: UtilService
    ) { }

    /**
     * 会員プログラム一覧取得
     */
    public async getProgramMemberships() {
        await this.cinerinoService.getServices();
        // 会員プログラム検索
        const programMemberships = await this.cinerinoService.programMembership.search({});

        return programMemberships.data;
    }

    /**
     * 登録
     * @method register
     */
    public async register(args: {
        theaterCode: string;
        programMembership: factory.programMembership.IProgramMembership
    }) {
        await this.cinerinoService.getServices();

        const branchCode = args.theaterCode;
        // 販売劇場検索
        const result = await this.cinerinoService.seller.search({
            location: { branchCodes: [branchCode] },
            typeOfs: [factory.organizationType.MovieTheater]
        });
        const seller = result.data[0];

        const programMembership = args.programMembership;
        if (programMembership.id === undefined
            || programMembership.offers === undefined
        ) {
            throw new Error('programMemberships is Injustice');
        }

        const offer = programMembership.offers[0];

        if (offer.identifier === undefined) {
            throw new Error('programMemberships is Injustice');
        }

        // 会員プログラム登録
        const registerProgramMembership = await this.cinerinoService.person.registerProgramMembership({
            id: 'me',
            programMembershipId: programMembership.id,
            offerIdentifier: offer.identifier,
            sellerType: seller.typeOf,
            sellerId: seller.id
        });

        console.log('registerProgramMembership', registerProgramMembership);
    }

    /**
     * 登録判定
     */
    public async isRegister() {
        await this.cinerinoService.getServices();
        const time = 3000;
        const limit = 20;
        let count = 0;
        return new Promise<boolean>((resolve, reject) => {
            const timer = setInterval(async () => {
                try {
                    const searchResult = await this.cinerinoService.ownerShipInfo.search({
                        typeOfGood: {
                            typeOf: factory.programMembership.ProgramMembershipType.ProgramMembership
                        }
                    });
                    const now = (await this.utilService.getServerTime()).date;
                    const programMembershipOwnershipInfos =
                        searchResult.data.filter(p => moment(p.ownedThrough).unix() > moment(now).unix());
                    if (programMembershipOwnershipInfos.length > 0) {
                        clearInterval(timer);
                        resolve(true);
                    } else if (count > limit) {
                        clearInterval(timer);
                        resolve(false);
                    }
                    count++;
                } catch (err) {
                    reject(err);
                }
            }, time);
        });
    }

    /**
     * 退会
     * @method unRegister
     */
    public async unRegister(args: {
        ownershipInfoIdentifier: string;
    }) {
        await this.cinerinoService.getServices();
        await this.cinerinoService.person.unRegisterProgramMembership({
            id: 'me',
            ownershipInfoIdentifier: args.ownershipInfoIdentifier
        });
    }

}
