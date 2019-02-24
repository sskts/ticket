import { Injectable } from '@angular/core';
import { factory } from '@motionpicture/sskts-api-javascript-client';
import { IProgramMembership } from '@motionpicture/sskts-factory/lib/factory/programMembership';
import { environment } from '../../../environments/environment';
import { SasakiService } from '../sasaki/sasaki.service';
import { SaveType, StorageService } from '../storage/storage.service';

export interface IData {
    userName?: string;
    memberType: MemberType;
    profile?: factory.person.IProfile;
    creditCards: factory.paymentMethod.paymentCard.creditCard.ICheckedCard[];
    accounts: factory.pecorino.account.IAccount<factory.accountType.Point>[];
    programMembershipOwnershipInfos: factory.ownershipInfo.IOwnershipInfo<IProgramMembership>[];
    prevUserName?: string;
}

export enum MemberType {
    NotMember = '0',
    Member = '1'
}

export interface IGmoTokenObject {
    token: string;
    toBeExpiredAt: string;
    maskedCardNo: string;
    isSecurityCodeSet: boolean;
}

const STORAGE_KEY = 'user';

@Injectable()
export class UserService {

    public data: IData;

    constructor(
        private storage: StorageService,
        private sasaki: SasakiService
    ) {
        this.load();
        this.save();
    }

    /**
     * 読み込み
     * @method load
     */
    public load() {
        const data: IData | null = this.storage.load(STORAGE_KEY, SaveType.Local);
        if (data === null) {
            this.data = {
                memberType: MemberType.NotMember,
                creditCards: [],
                accounts: [],
                programMembershipOwnershipInfos: [],
                prevUserName: ''
            };

            return;
        }
        this.data = data;
    }

    /**
     * 保存
     * @method save
     */
    public save() {
        this.storage.save(STORAGE_KEY, this.data, SaveType.Local);
    }

    /**
     * リセット
     * @method reset
     */
    public reset() {
        const prevUserName = this.data.accounts.length === 0 ? '' : this.data.accounts[0].name;
        this.data = {
            memberType: MemberType.NotMember,
            creditCards: [],
            accounts: [],
            programMembershipOwnershipInfos: [],
            prevUserName: prevUserName
        };
        this.save();
    }

    /**
     * 会員初期化
     * @method initMember
     */
    public async initMember() {
        this.data.memberType = MemberType.Member;
        this.save();
        await this.sasaki.getServices();
        if (this.sasaki.userName === undefined) {
            throw new Error('userName is undefined');
        }
        this.data.userName = this.sasaki.userName;
        // 連絡先取得
        /*const contact = await this.sasaki.person.getContacts({
            personId: 'me'
        });*/
        const profile = await this.sasaki.person.getProfile({id: 'me'});
        if (profile === undefined) {
            throw new Error('profile is undefined');
        }
        this.data.profile = profile;

        try {
            // クレジットカード検索
            const creditCards = await this.sasaki.person.findCreditCards({
                personId: 'me'
            });
            this.data.creditCards = creditCards;
        } catch (err) {
            console.log(err);
            this.data.creditCards = [];
        }

        // 口座検索
        let accounts = await this.sasaki.person.findAccounts({
            personId: 'me'
        });
        accounts = accounts.filter((account) => {
            return account.status === factory.pecorino.accountStatusType.Opened;
        });
        if (accounts.length === 0) {
            // 口座開設
            const account = await this.sasaki.person.openAccount({
                personId: 'me',
                name: this.sasaki.userName
            });
            this.data.accounts.push(account);
        } else {
            this.data.accounts = accounts;
        }

        const programMembershipOwnershipInfos = await this.sasaki.person.searchOwnershipInfos({
            goodType: 'ProgramMembership'
        });
        this.data.programMembershipOwnershipInfos = programMembershipOwnershipInfos;

        this.save();
    }

    /**
     * 口座情報更新
     * @method updateAccount
     */
    public async updateAccount() {
        await this.sasaki.getServices();
        // 口座検索
        let accounts = await this.sasaki.person.findAccounts({
            personId: 'me'
        });
        accounts = accounts.filter((account) => {
            return account.status === factory.pecorino.accountStatusType.Opened;
        });
        if (accounts.length === 0) {
            // 口座開設
            const account = await this.sasaki.person.openAccount({
                personId: 'me',
                name: this.getName()
            });
            this.data.accounts.push(account);
        } else {
            this.data.accounts = accounts;
        }
        this.save();
    }

    /**
     * 会員判定
     * @method isMember
     */
    public isMember() {
        return (this.data.memberType === MemberType.Member);
    }

    /**
     * 名前取得
     * @method getName
     */
    public getName() {
        if (this.data.profile === undefined) {
            return '';
        }
        return `${this.data.profile.familyName} ${this.data.profile.givenName}`;
    }

    /**
     * 電話番号取得（ハイフンなし）
     * @method getTelephone
     */
    public getTelephone() {
        if (this.data.profile === undefined) {
            return '';
        }
        return this.data.profile.telephone.replace(/\-/g, '');
    }

    /**
     * よく行く劇場名取得
     * @method getTheaterName
     */
    public getTheaterName(index: number) {
        const programMembershipOwnershipInfo = this.data.programMembershipOwnershipInfos[index];
        if (this.data.programMembershipOwnershipInfos.length === 0
            || programMembershipOwnershipInfo === undefined
            || programMembershipOwnershipInfo.acquiredFrom === undefined
            || programMembershipOwnershipInfo.acquiredFrom.typeOf !== factory.organizationType.MovieTheater) {
            return '';
        }

        return programMembershipOwnershipInfo.acquiredFrom.name.ja;
    }

    /**
     * よく行く劇場コード取得
     * @method getTheaterCode
     */
    public getTheaterCode(index: number) {
        const programMembershipOwnershipInfo = this.data.programMembershipOwnershipInfos[index];
        if (this.data.programMembershipOwnershipInfos.length === 0
            || programMembershipOwnershipInfo === undefined
            || programMembershipOwnershipInfo.acquiredFrom === undefined
            || programMembershipOwnershipInfo.acquiredFrom.typeOf !== factory.organizationType.MovieTheater
            || programMembershipOwnershipInfo.acquiredFrom.location === undefined) {
            return '';
        }

        return programMembershipOwnershipInfo.acquiredFrom.location.branchCode;
    }

    /**
     * 口座情報取得
     * @method getAccount
     */
    public getAccount(index: number) {
        if (this.data.accounts.length === 0) {
            return undefined;
        }
        return this.data.accounts[index];
    }

    /**
     * クレジットカード情報取得（表示用）
     * @method getCreditCard
     */
    public getCreditCard(index: number) {
        if (this.data.creditCards.length === 0) {
            return undefined;
        }
        return {
            cardNo: this.data.creditCards[index].cardNo,
            expire: `${this.data.creditCards[index].expire.slice(0, 2)}年 ${this.data.creditCards[index].expire.slice(2, 4)}月`
        };
    }

    /**
     * GMOトークン取得
     * @method getGmoObject
     */
    public async getGmoObject(args: {
        cardno: string;
        expire: string;
        securitycode: string;
        holdername: string;
    }) {
        const sendParam = args;
        console.log(sendParam);
        await this.sasaki.getServices();
        // 池袋
        const branchCode = (environment.production) ? '001' : '101';
        const result = await this.sasaki.seller.search({
            location: {branchCodes: [branchCode]},
            typeOfs: [factory.organizationType.MovieTheater]
        });
        const movieTheater = result.data[0];
        if (movieTheater.paymentAccepted === undefined) {
            throw new Error('movieTheater is undefined');
        }
        const payment = movieTheater.paymentAccepted.find(paymentAccepted =>
            paymentAccepted.paymentMethodType === factory.paymentMethodType.CreditCard);
        if (payment === undefined) {
            throw new Error('payment is undefined');
        }
        const gmoInfo = this.getGMOInfo(payment);
        if (gmoInfo === undefined) {
            throw new Error('gmoInfo is undefined');
        }
        return new Promise<IGmoTokenObject>((resolve, reject) => {
            (<any>window).someCallbackFunction = function someCallbackFunction(response: any) {
                if (response.resultCode === '000') {
                    resolve(response.tokenObject);
                } else {
                    reject(new Error(response.resultCode));
                }
            };
            const Multipayment = (<any>window).Multipayment;
            // shopId
            Multipayment.init(gmoInfo.shopId);
            Multipayment.getToken(sendParam, (<any>window).someCallbackFunction);
        });
    }

    /**
     * クレジットカード登録
     * @method registerCreditCard
     */
    public async registerCreditCard(gmoTokenObject: IGmoTokenObject) {
        await this.sasaki.getServices();
        // 登録
        await this.sasaki.person.addCreditCard({
            personId: 'me',
            creditCard: {
                token: gmoTokenObject.token
            }
        });
        this.data.creditCards = await this.sasaki.person.findCreditCards({
            personId: 'me'
        });
        if (this.data.creditCards.length > 1) {
            await this.deleteCreditCard();
            this.data.creditCards = await this.sasaki.person.findCreditCards({
                personId: 'me'
            });
        }

        this.save();
    }

    /**
     * クレジットカード削除
     */
    public async deleteCreditCard() {
        await this.sasaki.getServices();
        if (this.data.creditCards.length === 0) {
            return;
        }
        await this.sasaki.person.deleteCreditCard({
            personId: 'me',
            cardSeq: this.data.creditCards[0].cardSeq
        });
    }

    /**
     * 基本情報変更
     * @method updateProfile
     */
    public async updateProfile(args: {
        familyName: string;
        givenName: string;
        email: string;
        telephone: string;
        postalCode: string;
    }) {
        await this.sasaki.getServices();
        await this.sasaki.person.updateProfile({
            id: 'me',
            familyName: args.familyName,
            givenName: args.givenName,
            email: args.email,
            telephone: args.telephone
        });
        const profile = await this.sasaki.person.getProfile({
            id: 'me'
        });
        if (profile === undefined) {
            throw new Error('profile is undefined');
        }
        this.data.profile = profile;

        this.save();
    }

    /**
     * ユーザーネーム設定
     */
    public async setUserName() {
        await this.sasaki.getServices();
        this.data.userName = this.sasaki.userName;
        this.save();
    }

    /**
     * GMO情報を取得する
     */
    private getGMOInfo(accepted: any): factory.seller.IGMOInfo | undefined {
        return accepted.gmoInfo;
    }

}
