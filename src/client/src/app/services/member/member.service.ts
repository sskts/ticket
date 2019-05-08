import { Injectable } from '@angular/core';
import { factory } from '@motionpicture/sskts-api-javascript-client';
import { SasakiService } from '../sasaki/sasaki.service';

@Injectable()
export class MemberService {

    constructor(
        private sasaki: SasakiService
    ) { }

    /**
     * 会員プログラム一覧取得
     */
    public async getProgramMemberships() {
        await this.sasaki.getServices();
        // 会員プログラム検索
        const programMemberships = await this.sasaki.programMembership.search({});

        return programMemberships;
    }

    /**
     * 登録
     * @method register
     */
    public async register(args: {
        theaterCode: string;
        programMembership: factory.programMembership.IProgramMembership
    }) {
        await this.sasaki.getServices();

        const branchCode = args.theaterCode;
        // 販売劇場検索
        const result = await this.sasaki.seller.search({
            location: {branchCodes: [branchCode]},
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
        const registerProgramMembership = await this.sasaki.person.registerProgramMembership({
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
        await this.sasaki.getServices();
        const time = 3000;
        const limit = 20;
        let count = 0;
        return new Promise<boolean>((resolve, reject) => {
            const timer = setInterval(async () => {
                try {
                    const result =
                        await this.sasaki.ownerShip.search({
                            id: 'me',
                            typeOfGood: {
                                typeOf: 'ProgramMembership'
                            }
                        });
                    const programMembershipOwnershipInfos = result.data;
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
        await this.sasaki.getServices();
        await this.sasaki.person.unRegisterProgramMembership({
            id: 'me',
            ownershipInfoIdentifier: args.ownershipInfoIdentifier
        });
    }

}
