import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { getConfig, object2query } from '../functions';
import { AwsCognitoService } from './aws-cognito.service';
import {
    OwnershipInfoCreditCardsType,
    OwnershipInfoType,
    SmartTheaterService,
} from './smart-theater.service';
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
    profile?: {
        /**
         * 追加属性
         * プロジェクト固有の属性等
         */
        additionalProperty?: {
            name: string;
            value: string;
        }[];
        address?: string;
        age?: string;
        email?: string;
        givenName?: string;
        familyName?: string;
        gender?: string;
        telephone?: string;
    };
    /**
     * 登録済みクレジットカード
     */
    creditCards: OwnershipInfoCreditCardsType.ICreditCard[];
    /**
     * ポイント口座
     */
    accounts: OwnershipInfoType.IPaymentCard[];
    /**
     * プログラムメンバーシップ
     */
    programMembershipOwnershipInfos: OwnershipInfoType.IMembership[];
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
    Member = '1',
}

export interface IGmoTokenObject {
    token: string;
    toBeExpiredAt: string;
    maskedCardNo: string;
    isSecurityCodeSet: boolean;
}

const STORAGE_KEY = 'user';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    public data: IUserData;

    constructor(
        private storageService: StorageService,
        private smartTheaterService: SmartTheaterService,
        private awsCognitoService: AwsCognitoService,
        private utilService: UtilService
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
        const data: IUserData | null = this.storageService.load(
            STORAGE_KEY,
            SaveType.Local
        );
        if (data === null) {
            this.data = {
                memberType: MemberType.NotMember,
                creditCards: [],
                accounts: [],
                programMembershipOwnershipInfos: [],
                programMembershipRegistered: false,
                prevUserName: '',
            };
            return;
        }
        this.data = data;
        if (data.programMembershipRegistered === undefined) {
            this.data.programMembershipRegistered = false;
        }
        if (await this.smartTheaterService.needReload()) {
            await this.initMember();
            location.reload();
        }
    }

    /**
     * 保存
     * @method save
     */
    public save() {
        this.storageService.save(STORAGE_KEY, this.data, SaveType.Local);
    }

    /**
     * リセット
     * @method reset
     */
    public reset() {
        const prevUserName = this.data.prevUserName;
        this.data = {
            memberType: MemberType.NotMember,
            creditCards: [],
            accounts: [],
            programMembershipOwnershipInfos: [],
            programMembershipRegistered: false,
            prevUserName: prevUserName,
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
        const userName = await this.awsCognitoService.getUserName();
        if (userName === undefined) {
            throw new Error('userName is undefined');
        }
        this.data.userName = userName;
        // 連絡先取得
        const profile = await this.awsCognitoService.getProfile();
        this.data.profile = profile;

        try {
            await this.smartTheaterService.getServices();
            // クレジットカード検索
            this.data.creditCards =
                await this.smartTheaterService.ownershipInfoCreditCards.search();
        } catch (err) {
            console.log(err);
            this.data.creditCards = [];
        }
        // 口座検索
        const accounts = await this.searchPointAccount();
        this.data.accounts = accounts;
        this.data.programMembershipOwnershipInfos =
            await this.searchMyMemberships();
        this.save();
    }

    /**
     * 口座情報更新
     * @method updateAccount
     */
    public async updateAccount() {
        // 口座検索
        this.data.accounts = await this.searchPointAccount();
        this.save();
    }

    /**
     * ポイント口座作成
     */
    public async openPointAccount() {
        return new Promise(() => {
            const query = object2query({
                redirectUrl: location.origin,
                native: '1',
                member: '1',
            });
            const url = `${
                getConfig().ticketSiteUrl
            }/product/paymentcard/transaction?${query}`;
            location.href = url;
        });
    }

    /**
     * 不要なポイント口座閉じる
     */
    public async closeUnnecessaryPointAccount(params: {
        accounts: OwnershipInfoType.IPaymentCard[];
    }) {
        const { accounts } = params;
        for (let i = 1; i < accounts.length; i++) {
            const ownershipInfoId = accounts[i].id;
            await this.smartTheaterService.getServices();
            await this.smartTheaterService.ownershipInfo.remove({
                ownershipInfoId,
            });
        }
    }

    /**
     * 会員プログラムに登録する
     */
    public async registerProgramMembership(params: {
        theaterBranchCode: string;
        programMembershipRegistered: boolean;
    }) {
        const { programMembershipRegistered, theaterBranchCode } = params;
        return new Promise(() => {
            const query = object2query({
                redirectUrl: location.origin,
                native: '1',
                member: '1',
                programMembershipRegistered,
                theaterBranchCode,
            });
            const url = `${
                getConfig().ticketSiteUrl
            }/product/membership/transaction?${query}`;
            location.href = url;
        });
    }

    /**
     * 登録判定
     */
    public async isRegisterProgramMembership(params: {
        intervalTime: number;
        limitCount: number;
    }) {
        try {
            const { intervalTime, limitCount } = params;
            let roop = true;
            let count = 0;
            let result = false;
            await this.smartTheaterService.getServices();
            while (roop) {
                const searchResult =
                    await this.smartTheaterService.ownershipInfo.searchMemberships(
                        {
                            page: 1,
                        }
                    );
                const now = (await this.utilService.getServerTime()).date;
                const programMembershipOwnershipInfos = searchResult.filter(
                    (p) => moment(p.ownedThrough).unix() > moment(now).unix()
                );
                result = programMembershipOwnershipInfos.length > 0;
                count++;
                roop = !result && count < limitCount;
                if (roop) {
                    await this.utilService.sleep(intervalTime);
                }
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * メンバーシップを検索する
     * @method searchMyMemberships
     */
    public async searchMyMemberships() {
        await this.smartTheaterService.getServices();
        const searchResult =
            await this.smartTheaterService.ownershipInfo.searchMemberships({
                page: 1,
            });
        return searchResult;
    }

    /**
     * ポイントアカウントを検索する
     * @method searchPointAccount
     */
    public async searchPointAccount() {
        await this.smartTheaterService.getServices();
        // 口座検索
        const searchResult =
            await this.smartTheaterService.ownershipInfo.searchPaymentCard({});
        return searchResult;
    }

    /**
     * 会員判定
     * @method isMember
     */
    public isMember() {
        return this.data.memberType === MemberType.Member;
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
        if (
            this.data.profile === undefined ||
            this.data.profile.telephone === undefined
        ) {
            return '';
        }
        const no = this.data.profile.telephone.replace(/\-/g, '');
        return no.replace(/^\+81/g, '0');
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
            expire: `${this.data.creditCards[index].expire.slice(
                0,
                2
            )}年 ${this.data.creditCards[index].expire.slice(2, 4)}月`,
        };
    }

    /**
     * クレジットカード登録
     * @method registerCreditCard
     */
    public async registerCreditCard(params: IGmoTokenObject) {
        await this.smartTheaterService.getServices();
        // 登録
        await this.smartTheaterService.ownershipInfoCreditCards.add({
            token: params.token,
        });
        this.data.creditCards =
            await this.smartTheaterService.ownershipInfoCreditCards.search();
        if (this.data.creditCards.length > 1) {
            await this.smartTheaterService.ownershipInfoCreditCards.remove({
                cardSeq: this.data.creditCards[0].cardSeq,
            });
            this.data.creditCards =
                await this.smartTheaterService.ownershipInfoCreditCards.search();
        }

        this.save();
    }

    /**
     * 基本情報変更
     * @method updateProfile
     */
    public async updateProfile(params: {
        familyName: string;
        givenName: string;
        email: string;
        telephone: string;
        theaterCode: string;
    }) {
        const { familyName, givenName, email, theaterCode } = params;
        const telephone = params.telephone.replace(/^0/, '+81');
        await this.awsCognitoService.updateProfile({
            profile: {
                familyName,
                givenName,
                email,
                telephone,
                additionalProperty: [
                    { name: 'custom:theaterCode', value: theaterCode },
                ],
            },
        });
        const profile = await this.awsCognitoService.getProfile();
        this.data.profile = profile;
        this.save();
    }

    /**
     * よく行く劇場コードを取得する
     */
    public getWellGoTheaterCode() {
        if (
            this.data.profile !== undefined &&
            this.data.profile.additionalProperty !== undefined
        ) {
            const code = this.data.profile.additionalProperty.find((prop) => {
                return prop.name === 'custom:theaterCode';
            });
            if (code !== undefined) {
                return code.value;
            }
        }
        return undefined;
    }

    /**
     * 利用可能ポイント取得
     */
    public getAvailableBalance() {
        return this.data.accounts[0].typeOfGood.paymentAccount.balance;
    }
}
