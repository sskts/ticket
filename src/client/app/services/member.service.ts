import { Injectable } from '@angular/core';
import { factory } from '@cinerino/sdk';
import * as moment from 'moment';
import { CinerinoService } from './cinerino.service';
import { UtilService } from './util.service';

@Injectable({
    providedIn: 'root',
})
export class MemberService {
    constructor(
        private cinerinoService: CinerinoService,
        private utilService: UtilService
    ) {}

    /**
     * 会員プログラムに登録する
     */
    public async registerProgramMembership(params: {
        pointAwardAccount: {
            accountNumber: string;
        };
        creditCard: factory.chevre.paymentMethod.paymentCard.creditCard.IUnauthorizedCardOfMember;
        theaterBranchCode: string;
        programMembershipRegistered: boolean;
    }) {
        const {
            pointAwardAccount,
            creditCard,
            theaterBranchCode,
            programMembershipRegistered,
        } = params;
        await this.cinerinoService.getServices();
        const profile = await this.cinerinoService.person.getProfile({});
        if (profile.telephone === undefined) {
            throw new Error('No telephone');
        }

        // 販売者検索
        const searchSellersResult = await this.cinerinoService.seller.search({
            branchCode: { $eq: theaterBranchCode },
        });
        const seller = searchSellersResult.data[0];
        if (seller === undefined || seller.id === undefined) {
            throw new Error('No seller');
        }

        // メンバーシップ検索
        const { data } = await this.cinerinoService.product.search({
            typeOf: {
                $eq: factory.chevre.product.ProductType.MembershipService,
            },
        });
        if (data.length === 0) {
            throw new Error('no membership products');
        }
        const product = data.shift();
        if (
            product === undefined ||
            product.typeOf !==
                factory.chevre.product.ProductType.MembershipService ||
            product.id === undefined
        ) {
            throw new Error('no product');
        }

        // オファー検索
        const availableOffers = await this.cinerinoService.product.searchOffers(
            {
                itemOffered: { id: product.id },
                seller: { id: seller.id },
            }
        );
        if (availableOffers.length === 0) {
            throw new Error('no available offers');
        }
        const acceptedOffer = availableOffers[0];
        const passport = await this.cinerinoService.getPassport({
            scope: `placeOrderTransaction.MovieTheater-${theaterBranchCode}`,
        });
        const { date } = await this.utilService.getServerTime();
        const transaction =
            await this.cinerinoService.transaction.placeOrder.start({
                expires: moment(date).add(30, 'seconds').toDate(),
                seller: { typeOf: seller.typeOf, id: seller.id },
                object: { passport },
            });
        try {
            // 電話番号下4桁
            const accessCode = profile.telephone.slice(-4);

            await this.cinerinoService.offer.authorizeProduct({
                object: <any>{
                    typeOf: acceptedOffer.typeOf,
                    id: acceptedOffer.id,
                    itemOffered: {
                        typeOf: product.typeOf,
                        id: product.id,
                        serviceOutput: {
                            accessCode: accessCode,
                            name:
                                product.name === undefined ||
                                typeof product.name === 'string'
                                    ? product.name
                                    : product.name.ja,
                            // additionalProperty: [{ name: 'sampleName', value: 'sampleValue' }]
                        },
                        // ポイント特典付与先を指定
                        pointAward: {
                            typeOf: factory.chevre.actionType.MoneyTransfer,
                            toLocation: {
                                identifier: pointAwardAccount.accountNumber,
                            },
                            recipient: {
                                id: transaction.agent.id,
                                name: `${profile.givenName} ${profile.familyName}`,
                                typeOf: transaction.agent.typeOf,
                            },
                        },
                    },
                },
                purpose: { typeOf: transaction.typeOf, id: transaction.id },
            });

            // クレジットカード決済承認
            const amount =
                acceptedOffer.priceSpecification.priceComponent[0].price;
            const paymentServices: factory.service.paymentService.IService[] =
                [];
            const products = await this.cinerinoService.product.search({
                typeOf: {
                    $eq: factory.service.paymentService.PaymentServiceType
                        .CreditCard,
                },
            });
            products.data.forEach((p) => {
                if (
                    p.typeOf !==
                        factory.service.paymentService.PaymentServiceType
                            .CreditCard ||
                    p.provider === undefined
                ) {
                    return;
                }
                const findResult = p.provider.find(
                    (provider) => provider.id === seller.id
                );
                if (findResult === undefined) {
                    return;
                }
                paymentServices.push(p);
            });
            const serviceType = paymentServices[0].serviceType;
            if (serviceType === undefined) {
                throw new Error('paymentService.serviceType undefined');
            }
            await this.cinerinoService.payment.authorizeCreditCard({
                object: {
                    typeOf: factory.action.authorize.paymentMethod.any
                        .ResultType.Payment,
                    paymentMethod: serviceType.codeValue,
                    amount,
                    method: '1',
                    creditCard,
                },
                purpose: { typeOf: transaction.typeOf, id: transaction.id },
            });
            await this.cinerinoService.transaction.placeOrder.setProfile({
                id: transaction.id,
                agent: {
                    email: profile.email,
                    givenName: profile.givenName,
                    familyName: profile.familyName,
                    telephone: profile.telephone,
                    additionalProperty: programMembershipRegistered
                        ? undefined
                        : [{ name: 'firstMembership', value: '1' }],
                },
            });
            await this.cinerinoService.transaction.placeOrder.confirm({
                id: transaction.id,
                sendEmailMessage: false,
                // potentialActions: {
                //     order: {
                //         potentialActions: {
                //             sendOrder: {
                //                 potentialActions: {
                //                     sendEmailMessage: [
                //                         { object: email }
                //                     ]
                //                 }
                //             }
                //         }
                //     }
                // }
            });
        } catch (error) {
            this.cinerinoService.transaction.placeOrder
                .cancel({ id: transaction.id })
                .then()
                .catch((error2) => {
                    console.error(error2);
                });
            throw error;
        }
    }

    /**
     * 登録判定
     */
    public async isRegister(params: { interval: number; limit: number }) {
        try {
            const { interval, limit } = params;
            let roop = true;
            let count = 0;
            let result = false;
            await this.cinerinoService.getServices();
            while (roop) {
                const searchResult =
                    await this.cinerinoService.ownerShipInfo.search({
                        typeOfGood: {
                            typeOf: factory.chevre.programMembership
                                .ProgramMembershipType.ProgramMembership,
                        },
                    });
                const now = (await this.utilService.getServerTime()).date;
                const programMembershipOwnershipInfos =
                    searchResult.data.filter(
                        (p) =>
                            moment(p.ownedThrough).unix() > moment(now).unix()
                    );
                result = programMembershipOwnershipInfos.length > 0;
                count++;
                roop = !result && count < limit;
                if (roop) {
                    await this.utilService.sleep(interval);
                }
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * 退会
     * @method unRegister
     */
    public async unRegister() {
        await this.cinerinoService.getServices();
        await this.cinerinoService.person.deleteById({});
    }
}
