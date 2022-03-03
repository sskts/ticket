import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {
    OwnershipInfoCreditCardsService,
    OwnershipInfoCreditCardsType,
} from './smart-theater/ownershipInfo-creditcards.service';
import {
    OwnershipInfoService,
    OwnershipInfoType,
} from './smart-theater/ownershipInfo.service';
import { PeopleService } from './smart-theater/people.service';
import { SellerService, SellerType } from './smart-theater/seller.service';
import { StorageService } from './storage.service';

export { OwnershipInfoType, OwnershipInfoCreditCardsType, SellerType };

@Injectable({
    providedIn: 'root',
})
export class SmartTheaterService {
    private endpoint: string;
    private accessToken: string;
    private projectId: string;
    private clientId: string;

    constructor(
        private http: HttpClient,
        private storage: StorageService,
        public ownershipInfo: OwnershipInfoService,
        public ownershipInfoCreditCards: OwnershipInfoCreditCardsService,
        public people: PeopleService,
        public seller: SellerService
    ) {}

    /**
     * getServices
     */
    public async getServices(): Promise<void> {
        try {
            const option = await this.createOption();
            this.ownershipInfo.setOption(option);
            this.ownershipInfoCreditCards.setOption(option);
            this.people.setOption(option);
            this.seller.setOption(option);
        } catch (err) {
            console.log(err);
            throw new Error('getServices is failed');
        }
    }

    /**
     * サインイン
     */
    public async signIn() {
        const url = '/api/authorize/signIn';
        const result = await this.http
            .get<{ url: string }>(url, {})
            .toPromise();
        location.replace(result.url);
    }

    /**
     * サインアップ
     */
    public async signUp() {
        const url = '/api/authorize/signUp';
        const result = await this.http
            .get<{ url: string }>(url, {})
            .toPromise();
        location.href = result.url;
    }

    /**
     * サインアウト
     */
    public async signOut() {
        const url = '/api/authorize/signOut';
        const result = await this.http
            .get<{ url: string }>(url, {})
            .toPromise();
        location.href = result.url;
    }

    /**
     * @method createOption
     */
    public async createOption() {
        await this.authorize();

        return {
            endpoint: this.endpoint,
            projectId: this.projectId,
            accessToken: this.accessToken,
        };
    }

    /**
     * @method authorize
     */
    public async authorize() {
        const user = this.storage.load('user');
        const memberType = user.memberType;
        const url = '/api/authorize/getCredentials';
        const body = { member: memberType };
        const result = await this.http
            .post<{
                credentials: { accessToken: string };
                userName?: string;
                clientId: string;
                endpoint: string;
                apiEndpoint: string;
                projectId: string;
                waiterServerUrl: string;
            }>(url, body)
            .toPromise();
        this.endpoint = result.apiEndpoint;
        this.accessToken = result.credentials.accessToken;
        this.projectId = result.projectId;
        this.clientId = result.clientId;
    }

    /**
     * サーバーのバージョンをチェックし、
     */
    public async needReload() {
        const version = await this.getAPIVersion();
        const server = this.storage.load('server');
        if (server === null) {
            this.storage.save('server', { version: version });
            return true;
        }
        if (server.version !== version) {
            this.storage.save('server', { version: version });
            return true;
        }
        return false;
    }

    /**
     * @method getAPIVersion
     * package.jsonから取得したバージョンを取得する
     */
    private async getAPIVersion() {
        const url = '/api/version';
        const result = await this.http
            .get<{
                version: string;
            }>(url)
            .toPromise();
        return result.version;
    }

    public getClientId() {
        return this.clientId;
    }
}
