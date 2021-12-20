import { Injectable } from '@angular/core';
import { factory } from '@cinerino/sdk';
import * as moment from 'moment';
import { getConfig, object2query } from '../functions';
import { AwsCognitoService } from './aws-cognito.service';
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
    accounts: factory.ownershipInfo.IOwnershipInfo<factory.permit.IPermit>[];
    /**
     * プログラムメンバーシップ
     */
    programMembershipOwnershipInfos: factory.ownershipInfo.IOwnershipInfo<factory.permit.IPermit>[];
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
        private cinerinoService: CinerinoService,
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
        if (await this.cinerinoService.needReload()) {
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
        const prevUserName =
            this.cinerinoService.userName !== undefined
                ? this.cinerinoService.userName
                : this.data.prevUserName !== undefined
                ? this.data.prevUserName
                : '';
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
        await this.cinerinoService.getServices();
        if (this.cinerinoService.userName === undefined) {
            throw new Error('userName is undefined');
        }
        const { accessToken } = this.cinerinoService.auth.credentials;
        if (accessToken === undefined) {
            throw new Error('accessToken undefined');
        }
        this.data.userName = this.cinerinoService.userName;
        // 連絡先取得
        const profile = await this.awsCognitoService.getProfile({
            accessToken,
        });
        this.data.profile = profile;

        try {
            // クレジットカード検索
            const creditCards =
                await this.cinerinoService.ownerShipInfo.searchCreditCards({});
            this.data.creditCards = creditCards;
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
        accounts: factory.ownershipInfo.IOwnershipInfo<factory.permit.IPermit>[];
    }) {
        const { accounts } = params;
        for (let i = 1; i < accounts.length; i++) {
            const closeAccountNumber = accounts[i].typeOfGood.identifier;
            if (typeof closeAccountNumber !== 'string') {
                throw new Error('typeOfGood.identifier not string');
            }
            await this.cinerinoService.ownerShipInfo.closeAccount({
                accountNumber: closeAccountNumber,
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
     * 退会
     * @method deleteUser
     */
    public async deleteUser() {
        await this.cinerinoService.getServices();
        const { accessToken } = this.cinerinoService.auth.credentials;
        if (accessToken === undefined) {
            throw new Error('accessToken undefined');
        }
        await this.awsCognitoService.deleteUser({ accessToken });
    }

    /**
     * メンバーシップを検索する
     * @method searchMyMemberships
     */
    public async searchMyMemberships() {
        await this.cinerinoService.getServices();
        // 口座検索
        const searchResult = (
            await this.cinerinoService.ownerShipInfo.searchMyMemberships({})
        ).data;
        return searchResult;
    }

    /**
     * ポイントアカウントを検索する
     * @method searchPointAccount
     */
    public async searchPointAccount() {
        await this.cinerinoService.getServices();
        // 口座検索
        const searchResult =
            await this.cinerinoService.ownerShipInfo.searchMyPaymentCards({
                sort: {
                    ownedFrom: factory.sortType.Ascending,
                },
            });
        const accounts = searchResult.data.filter((a) => {
            const typeOfGood = <factory.permit.IPermit>a.typeOfGood;
            const paymentAccount = typeOfGood.paymentAccount;
            return (
                paymentAccount !== undefined &&
                paymentAccount.status === factory.accountStatusType.Opened
            );
        });
        return accounts;
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
     * よく行く劇場名取得
     * @method getTheaterName
     */
    public getTheaterName(index: number) {
        const programMembershipOwnershipInfo =
            this.data.programMembershipOwnershipInfos[index];
        if (
            this.data.programMembershipOwnershipInfos.length === 0 ||
            programMembershipOwnershipInfo === undefined ||
            programMembershipOwnershipInfo.acquiredFrom === undefined ||
            programMembershipOwnershipInfo.acquiredFrom.typeOf !==
                factory.chevre.organizationType.MovieTheater
        ) {
            return '';
        }
        const name = programMembershipOwnershipInfo.acquiredFrom.name;

        return name === undefined
            ? ''
            : typeof name === 'string'
            ? name
            : name.ja === undefined
            ? ''
            : name.ja;
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
    public async registerCreditCard(gmoTokenObject: IGmoTokenObject) {
        await this.cinerinoService.getServices();
        // 登録
        await this.cinerinoService.ownerShipInfo.addCreditCard({
            creditCard: { token: gmoTokenObject.token },
        });
        this.data.creditCards =
            await this.cinerinoService.ownerShipInfo.searchCreditCards({});
        if (this.data.creditCards.length > 1) {
            await this.deleteCreditCard();
            this.data.creditCards =
                await this.cinerinoService.ownerShipInfo.searchCreditCards({});
        }

        this.save();
    }

    /**
     * クレジットカード削除
     */
    public async deleteCreditCard() {
        await this.cinerinoService.getServices();
        if (this.data.creditCards.length === 0) {
            return;
        }
        await this.cinerinoService.ownerShipInfo.deleteCreditCard({
            cardSeq: this.data.creditCards[0].cardSeq,
        });
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
        await this.cinerinoService.getServices();
        const { accessToken } = this.cinerinoService.auth.credentials;
        if (accessToken === undefined) {
            throw new Error('accessToken undefined');
        }
        await this.awsCognitoService.updateProfile({
            accessToken,
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
        const profile = await this.awsCognitoService.getProfile({
            accessToken,
        });
        this.data.profile = profile;
        this.save();
    }

    /**
     * ユーザーネーム設定
     */
    public async setUserName() {
        await this.cinerinoService.getServices();
        this.data.userName = this.cinerinoService.userName;
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
        const paymentAccount = this.data.accounts[0].typeOfGood.paymentAccount;
        return paymentAccount === undefined ||
            paymentAccount.availableBalance === undefined
            ? 0
            : paymentAccount.availableBalance;
    }
}
