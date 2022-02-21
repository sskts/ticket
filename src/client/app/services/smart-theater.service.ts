import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { OwnershipInfoCreditCardsService } from './smart-theater/ownershipInfo-creditcards.service';
import { OwnershipInfoService } from './smart-theater/ownershipInfo.service';
import { PeopleService } from './smart-theater/people.service';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class SmartTheaterService {
    private endpoint: string;
    private accessToken: string;
    private projectId: string;

    constructor(
        private http: HttpClient,
        private storage: StorageService,
        public ownershipInfo: OwnershipInfoService,
        public ownershipInfoCreditCards: OwnershipInfoCreditCardsService,
        public people: PeopleService
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
        } catch (err) {
            console.log(err);
            throw new Error('getServices is failed');
        }
    }

    /**
     * サインイン
     */
    public async signIn(isReSignIn: boolean = false) {
        await this.signInWithUserName(isReSignIn);
    }

    /**
     * ユーザー名付きサインイン
     */
    public async signInWithUserName(
        isReSignIn: boolean = false,
        userName: string = ''
    ) {
        const url = '/api/authorize/signIn';
        const result = await this.http
            .get<{ url: string }>(url, {})
            .toPromise();
        let redirectUrl = result.url;
        if (isReSignIn) {
            redirectUrl += '&isReSignIn=1';
        }
        location.replace(
            `${redirectUrl}&userName=${encodeURIComponent(userName)}`
        );
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
}
