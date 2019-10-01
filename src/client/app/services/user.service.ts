import { Injectable } from '@angular/core';
import { factory } from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';
import { environment } from '../../environments/environment';
import { SasakiService } from './sasaki.service';
import { SaveType, StorageService } from './storage.service';
import { UtilService } from './util.service';

type accountType = factory.ownershipInfo.IOwnershipInfo<factory.pecorino.account.IAccount<factory.accountType.Point>>;
type programMembershipType = factory.ownershipInfo.IOwnershipInfo<factory.ownershipInfo.IGood<'ProgramMembership'>>;

export interface IUserData {
    userName?: string;
    memberType: MemberType;
    profile?: factory.person.IProfile;
    creditCards: factory.paymentMethod.paymentCard.creditCard.ICheckedCard[];
    accounts: accountType[];
    programMembershipOwnershipInfos: programMembershipType[];
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

interface PointAccountMutex {
    expire: Number;
}

const STORAGE_KEY = 'user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public data: IUserData;

    constructor(
        private storage: StorageService,
        private sasaki: SasakiService,
        private util: UtilService
    ) {
        this.init();
    }

    private async init() {
        this.load();
        this.save();
    }

    /**
     * 読み込み
     * @method load
     */
    public async load() {
        const data: IUserData | null = this.storage.load(STORAGE_KEY, SaveType.Local);
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
        if (await this.sasaki.needReload()) {
            await this.initMember();
            location.reload();
        }
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
        const prevUserName =
            this.sasaki.userName !== undefined ? this.sasaki.userName :
                this.data.accounts.length > 0 &&
                    this.data.accounts[0].typeOfGood !== null &&
                    this.data.accounts[0].typeOfGood !== undefined ? this.data.accounts[0].typeOfGood.name :
                    this.data.prevUserName !== undefined ? this.data.prevUserName : '';
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
        const profile = await this.sasaki.person.getProfile({ id: 'me' });
        if (profile === undefined) {
            throw new Error('profile is undefined');
        }
        this.data.profile = profile;

        try {
            // クレジットカード検索
            const creditCards = await this.sasaki.ownerShip.searchCreditCards({
                personId: 'me'
            });
            this.data.creditCards = creditCards;
        } catch (err) {
            console.log(err);
            this.data.creditCards = [];
        }

        // 口座検索または作成
        this.data.accounts = await this.openPointAccountIfNotExists();

        const programMembershipOwnershipInfos = await this.sasaki.ownerShip.search<'ProgramMembership'>({
            id: 'me',
            typeOfGood: {
                typeOf: 'ProgramMembership'
            }
        });
        this.data.programMembershipOwnershipInfos = programMembershipOwnershipInfos.data;
        this.save();
    }

    /**
     * 口座情報更新
     * @method updateAccount
     */
    public async updateAccount() {
        await this.sasaki.getServices();
        // 口座検索または作成
        this.data.accounts = await this.openPointAccountIfNotExists();
        this.save();
    }

    /**
     * ポイントアカウントを検索し、存在しない場合は作成する
     * 検索された
     * @method openPointAccountIfNotExists
     */
    private async openPointAccountIfNotExists() {
        const POINT_ACCOUNT_MUTEX_KEY = 'point_account_mutex';
        try {
            // 排他制御処理 15秒間
            const limit = 50;
            for (let i = 0; i < limit; i++) {
                const now = moment().unix();
                const accountMutex: PointAccountMutex | null = this.storage.load(POINT_ACCOUNT_MUTEX_KEY, SaveType.Local);
                if (accountMutex === null || accountMutex.expire < now) {
                    break;
                }
                await this.util.sleep(300);
            }
            const mutex: PointAccountMutex = { expire: moment().add(15, 'seconds').unix() };
            this.storage.save(POINT_ACCOUNT_MUTEX_KEY, mutex, SaveType.Local);

            let accounts = await this.searchPointAccount();
            if (accounts.length === 0) {
                await this.openPointAccount();
                accounts = await this.searchPointAccount();
            }
            this.storage.remove(POINT_ACCOUNT_MUTEX_KEY, SaveType.Local);
            return accounts;
        } catch (error) {
            this.storage.remove(POINT_ACCOUNT_MUTEX_KEY, SaveType.Local);
            throw error;
        }
    }

    private async openPointAccount() {
        await this.sasaki.ownerShip.openAccount({
            id: 'me',
            accountType: factory.accountType.Point,
            name: (<string>this.sasaki.userName)
        });
    }

    /**
    * ポイントアカウントを検索する
    * @method searchPointAccount
    */
    private async searchPointAccount() {
        // 口座検索
        const accountSearchResult = await this.sasaki.ownerShip.search({
            id: 'me',
            typeOfGood: {
                typeOf: factory.ownershipInfo.AccountGoodType.Account,
                accountType: factory.accountType.Point
            }
        });
        const accounts = <accountType[]>accountSearchResult.data.filter((account) => {
            return (account.typeOfGood.typeOf === factory.pecorino.account.TypeOf.Account
                && account.typeOfGood.accountType === factory.accountType.Point
                && account.typeOfGood.status === factory.pecorino.accountStatusType.Opened);
        });
        // 口座開設についてあとに作ったものが先にくるようにソートする
        accounts.sort((a: accountType, b: accountType) => {
            return (a.typeOfGood.openDate > b.typeOfGood.openDate) ? -1 :
                (a.typeOfGood.openDate < b.typeOfGood.openDate) ? 1 : 0;
        });
        return accounts;
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
        if (this.data.profile === undefined || this.data.profile.telephone === undefined) {
            return '';
        }
        const no = this.data.profile.telephone.replace(/\-/g, '');
        return no.replace(/^\+81/g, '0');
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
            || programMembershipOwnershipInfo.typeOfGood === undefined
            || programMembershipOwnershipInfo.typeOfGood.hostingOrganization === undefined
            || programMembershipOwnershipInfo.typeOfGood.hostingOrganization.location === undefined) {
            return '';
        }

        return programMembershipOwnershipInfo.typeOfGood.hostingOrganization.location.branchCode;
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
            location: { branchCodes: [branchCode] },
            typeOfs: [factory.organizationType.MovieTheater]
        });
        const movieTheater = result.data[0];

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
            if (movieTheater.paymentAccepted === undefined) {
                return reject(new Error('The settlement method does not correspond'));
            }
            const paymentAccepted = movieTheater.paymentAccepted.find(p => p.paymentMethodType === factory.paymentMethodType.CreditCard);
            if (paymentAccepted === undefined || paymentAccepted.paymentMethodType !== factory.paymentMethodType.CreditCard) {
                return reject(new Error('The settlement method does not correspond'));
            }
            Multipayment.init((<factory.seller.ICreditCardPaymentAccepted>paymentAccepted).gmoInfo.shopId);
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
        await this.sasaki.ownerShip.addCreditCard({
            personId: 'me',
            creditCard: {
                token: gmoTokenObject.token
            }
        });
        this.data.creditCards = await this.sasaki.ownerShip.searchCreditCards({
            personId: 'me'
        });
        if (this.data.creditCards.length > 1) {
            await this.deleteCreditCard();
            this.data.creditCards = await this.sasaki.ownerShip.searchCreditCards({
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
        await this.sasaki.ownerShip.deleteCreditCard({
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
        theaterCode: string;
    }) {
        const tel = args.telephone.replace(/^0/, '+81');
        await this.sasaki.getServices();
        await this.sasaki.person.updateProfile({
            id: 'me',
            familyName: args.familyName,
            givenName: args.givenName,
            email: args.email,
            telephone: tel,
            additionalProperty: [
                { name: 'custom:theaterCode', value: args.theaterCode }
            ]
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
    * よく行く劇場コードを取得する
    */
    public getWellGoTheaterCode() {
        if (this.data.profile !== undefined && this.data.profile.additionalProperty !== undefined) {
            const code = this.data.profile.additionalProperty.find((prop) => {
                return prop.name === 'custom:theaterCode';
            });
            if (code !== undefined) {
                return code.value;
            }
        }
        return this.getTheaterCode(0);
    }
}
