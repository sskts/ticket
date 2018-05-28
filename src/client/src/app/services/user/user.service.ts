import { Injectable } from '@angular/core';
import { factory } from '@motionpicture/sskts-api-javascript-client';
import { environment } from '../../../environments/environment';
import { SasakiService } from '../sasaki/sasaki.service';
import { SaveType, StorageService } from '../storage/storage.service';


export interface IData {
    memberType: MemberType;
    contact?: factory.person.IContact;
    creditCards?: factory.paymentMethod.paymentCard.creditCard.ICheckedCard[];
    account?: factory.pecorino.account.IAccount;
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
                memberType: MemberType.NotMember
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
        this.data = {
            memberType: MemberType.NotMember
        };
        this.save();
    }

    /**
     * 会員初期化
     */
    public async initMember() {
        this.data.memberType = MemberType.Member;
        await this.sasaki.getServices();
        // 連絡先取得
        const contact = await this.sasaki.person.getContacts({
            personId: 'me'
        });
        if (contact === undefined) {
            throw new Error('contact is undefined');
        }
        this.data.contact = contact;

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
            this.data.account = await this.sasaki.person.openAccount({
                personId: 'me',
                name: `${this.data.contact.familyName} ${this.data.contact.givenName}`
            });
        } else {
            this.data.account = accounts[0];
        }
        console.log('口座番号', this.data.account.accountNumber);

        this.save();
    }

    /**
     * 口座情報更新
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
            this.data.account = await this.sasaki.person.openAccount({
                personId: 'me',
                name: this.getName()
            });
        } else {
            this.data.account = accounts[0];
        }
        this.save();
    }

    /**
     * 会員判定
     */
    public isMember() {
        return (this.data.memberType === MemberType.Member);
    }

    /**
     * 名前取得
     */
    public getName() {
        if (this.data.contact === undefined) {
            return '';
        }
        return `${this.data.contact.familyName} ${this.data.contact.givenName}`;
    }

    /**
     * 電話番号取得（ハイフンなし）
     */
    public getTelephone() {
        if (this.data.contact === undefined) {
            return '';
        }
        return this.data.contact.telephone.replace(/\-/g, '');
    }

    /**
     * クレジットカード情報取得（表示）
     */
    public getCreditCard(index: number) {
        if (this.data.creditCards === undefined
            || this.data.creditCards.length === 0) {
            return undefined;
        }
        return {
            cardNo: this.data.creditCards[index].cardNo,
            expire: `${this.data.creditCards[index].expire.slice(0, 2)}年 ${this.data.creditCards[index].expire.slice(2, 4)}月`
        };
    }

    /**
     * GMOトークン取得
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
        const movieTheater = await this.sasaki.organization.findMovieTheaterByBranchCode({
            branchCode: branchCode
        });
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
            Multipayment.init(movieTheater.gmoInfo.shopId);
            Multipayment.getToken(sendParam, (<any>window).someCallbackFunction);
        });
    }

    /**
     * クレジットカード登録
     */
    public async registerCreditCard(gmoTokenObject: IGmoTokenObject) {
        await this.sasaki.getServices();
        if (this.data.creditCards !== undefined
            && this.data.creditCards.length > 0) {
            // 登録済みなら削除
            await this.sasaki.person.deleteCreditCard({
                personId: 'me',
                cardSeq: this.data.creditCards[0].cardSeq
            });
        }
        // 登録
        await this.sasaki.person.addCreditCard({
            personId: 'me',
            creditCard: {
                token: gmoTokenObject.token
            }
        });

        const creditCards = await this.sasaki.person.findCreditCards({
            personId: 'me'
        });
        this.data.creditCards = creditCards;

        this.save();
    }

    /**
     * 基本情報変更
     */
    public async updateProfile(args: {
        familyName: string;
        givenName: string;
        email: string;
        telephone: string;
        postalCode: string;
    }) {
        await this.sasaki.getServices();
        await this.sasaki.person.updateContacts({
            personId: 'me',
            contacts: {
                familyName: args.familyName,
                givenName: args.givenName,
                email: args.email,
                telephone: args.telephone
            }
        });
        const contact = await this.sasaki.person.getContacts({
            personId: 'me'
        });
        if (contact === undefined) {
            throw new Error('contact is undefined');
        }
        this.data.contact = contact;

        this.save();
    }

}
