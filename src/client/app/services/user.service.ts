import { Injectable } from '@angular/core';
import { factory } from '@cinerino/sdk';
import * as moment from 'moment';
import { environment } from '../../environments/environment';
import { CinerinoService } from './cinerino.service';
import { SaveType, StorageService } from './storage.service';
import { UtilService } from './util.service';


export interface IUserData {
    /**
     * ユーザーネーム
     */
    userName?: string;
    /**
     * メンバータイプ
     * （0: 非会員, 1:会員）
     */
    memberType: MemberType;
    /**
     * 登録済みプロフィール
     */
    profile?: factory.person.IProfile;
    /**
     * 登録済みクレジットカード
     */
    creditCards: factory.chevre.paymentMethod.paymentCard.creditCard.ICheckedCard[];
    /**
     * ポイント口座
     */
    accounts: factory.ownershipInfo.IOwnershipInfo<factory.account.IAccount>[];
    /**
     * プログラムメンバーシップ
     */
    programMembershipOwnershipInfos: factory.ownershipInfo.IOwnershipInfo<factory.chevre.programMembership.IProgramMembership>[];
    /**
     * プログラムメンバーシップ登録判定
     */
    programMembershipRegistered: boolean;
    /**
     * ログイン済みユーザーネーム
     * （ログイン画面ユーザーネーム忘れ対応）
     */
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
        private cinerino: CinerinoService,
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
                programMembershipRegistered: false,
                prevUserName: ''
            };
            return;
        }
        this.data = data;
        if (data.programMembershipRegistered === undefined) {
            this.data.programMembershipRegistered = false;
        }
        if (await this.cinerino.needReload()) {
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
            this.cinerino.userName !== undefined ? this.cinerino.userName :
                this.data.accounts.length > 0 &&
                    this.data.accounts[0].typeOfGood !== null &&
                    this.data.accounts[0].typeOfGood !== undefined ? this.data.accounts[0].typeOfGood.name :
                    this.data.prevUserName !== undefined ? this.data.prevUserName : '';
        this.data = {
            memberType: MemberType.NotMember,
            creditCards: [],
            accounts: [],
            programMembershipOwnershipInfos: [],
            programMembershipRegistered: false,
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
        await this.cinerino.getServices();
        if (this.cinerino.userName === undefined) {
            throw new Error('userName is undefined');
        }
        this.data.userName = this.cinerino.userName;
        // 連絡先取得
        const profile = await this.cinerino.person.getProfile({});
        if (profile === undefined) {
            throw new Error('profile is undefined');
        }
        this.data.profile = profile;

        try {
            // クレジットカード検索
            const creditCards = await this.cinerino.ownerShipInfo.searchCreditCards({});
            this.data.creditCards = creditCards;
        } catch (err) {
            console.log(err);
            this.data.creditCards = [];
        }
        // 口座検索または作成
        this.data.accounts = await this.openPointAccountIfNotExists();
        const searchResult =
            await this.cinerino.ownerShipInfo.search({
                typeOfGood: {
                    typeOf: factory.chevre.programMembership.ProgramMembershipType.ProgramMembership
                }
            });
        this.data.programMembershipOwnershipInfos =
            <factory.ownershipInfo.IOwnershipInfo<factory.chevre.programMembership.IProgramMembership>[]>searchResult.data;
        this.save();
    }

    /**
     * 口座情報更新
     * @method updateAccount
     */
    public async updateAccount() {
        await this.cinerino.getServices();
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
        await this.cinerino.ownerShipInfo.openAccount({
            accountType: 'Point',
            name: (<string>this.cinerino.userName)
        });
    }

    /**
    * ポイントアカウントを検索する
    * @method searchPointAccount
    */
    private async searchPointAccount() {
        // 口座検索
        const searchResult = await this.cinerino.ownerShipInfo.search({
            sort: {
                ownedFrom: factory.sortType.Ascending
            },
            typeOfGood: {
                typeOf: 'Account',
                accountType: 'Point'
            }
        });
        const accounts =
            searchResult.data.filter((a) => {
                return (a.typeOfGood.typeOf === 'Account'
                    && (<factory.account.IAccount>a.typeOfGood).status === factory.accountStatusType.Opened);
            });
        return <factory.ownershipInfo.IOwnershipInfo<factory.account.IAccount>[]>accounts;
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
            || programMembershipOwnershipInfo.acquiredFrom.typeOf !== factory.chevre.organizationType.MovieTheater) {
            return '';
        }
        const name = programMembershipOwnershipInfo.acquiredFrom.name;

        return (name === undefined) ? ''
            : (typeof name === 'string') ? name
                : (name.ja === undefined) ? ''
                    : name.ja;
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
    public async getGmoObject(sendParam: {
        cardno: string;
        expire: string;
        securitycode: string;
        holdername: string;
    }) {
        await this.cinerino.getServices();
        const branchCode = environment.MAIN_SHOP_BRUNCH_CODE;
        const searchResult = await this.cinerino.seller.search({});
        const findResult = searchResult.data.find(s => s.location !== undefined && s.location.branchCode === branchCode);
        const seller = (findResult === undefined) ? searchResult.data[0] : findResult;

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
            if (seller.paymentAccepted === undefined) {
                return reject(new Error('The settlement method does not correspond'));
            }
            const findPaymentAcceptedResult =
            seller.paymentAccepted.find(p => p.paymentMethodType === factory.paymentMethodType.CreditCard);
            if (findPaymentAcceptedResult === undefined
                || findPaymentAcceptedResult.paymentMethodType !== factory.paymentMethodType.CreditCard
                || (<any>findPaymentAcceptedResult).gmoInfo === undefined) {
                return reject(new Error('The settlement method does not correspond'));
            }
            Multipayment.init((<any>findPaymentAcceptedResult).gmoInfo.shopId);
            Multipayment.getToken(sendParam, (<any>window).someCallbackFunction);
        });
    }

    /**
    * クレジットカード登録
    * @method registerCreditCard
    */
    public async registerCreditCard(gmoTokenObject: IGmoTokenObject) {
        await this.cinerino.getServices();
        // 登録
        await this.cinerino.ownerShipInfo.addCreditCard({
            creditCard: { token: gmoTokenObject.token }
        });
        this.data.creditCards = await this.cinerino.ownerShipInfo.searchCreditCards({});
        if (this.data.creditCards.length > 1) {
            await this.deleteCreditCard();
            this.data.creditCards = await this.cinerino.ownerShipInfo.searchCreditCards({});
        }

        this.save();
    }

    /**
    * クレジットカード削除
    */
    public async deleteCreditCard() {
        await this.cinerino.getServices();
        if (this.data.creditCards.length === 0) {
            return;
        }
        await this.cinerino.ownerShipInfo.deleteCreditCard({
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
        theaterCode: string;
    }) {
        const tel = args.telephone.replace(/^0/, '+81');
        await this.cinerino.getServices();
        await this.cinerino.person.updateProfile({
            id: 'me',
            familyName: args.familyName,
            givenName: args.givenName,
            email: args.email,
            telephone: tel,
            additionalProperty: [
                { name: 'custom:theaterCode', value: args.theaterCode }
            ]
        });
        const profile = await this.cinerino.person.getProfile({
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
        await this.cinerino.getServices();
        this.data.userName = this.cinerino.userName;
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

    /**
     * 利用可能ポイント取得
     */
    public getAvailableBalance() {
        return this.data.accounts[0].typeOfGood.availableBalance;
    }
}
