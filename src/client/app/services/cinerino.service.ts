import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as cinerino from '@cinerino/api-javascript-client';
import 'rxjs/add/operator/toPromise';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class CinerinoService {

    public auth: cinerino.IImplicitGrantClient;
    public userName?: string;
    public event: cinerino.service.Event;
    public order: cinerino.service.Order;
    public seller: cinerino.service.Seller;
    public person: cinerino.service.Person;
    public ownerShipInfo: cinerino.service.person.OwnershipInfo;
    public transaction: {
        placeOrder: cinerino.service.transaction.PlaceOrder
    };
    public programMembership: cinerino.service.ProgramMembership;
    private endpoint: string;

    constructor(
        private http: HttpClient,
        private storage: StorageService
    ) { }

    /**
     * getServices
     */
    public async getServices(): Promise<void> {
        try {
            const option = await this.createOption();
            this.event = new cinerino.service.Event(option);
            this.order = new cinerino.service.Order(option);
            this.seller = new cinerino.service.Seller(option);
            this.person = new cinerino.service.Person(option);
            this.ownerShipInfo = new cinerino.service.person.OwnershipInfo(option);
            this.transaction = {
                placeOrder: new cinerino.service.transaction.PlaceOrder(option)
            };
            this.programMembership = new cinerino.service.ProgramMembership(option);
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
    public async signInWithUserName(isReSignIn: boolean = false, userName: string = '') {
        const url = '/api/authorize/signIn';
        const result = await this.http.get<any>(url, {}).toPromise();
        let redirectUrl = result.url;
        console.log(result.url);
        if (isReSignIn) {
            redirectUrl += '&isReSignIn=1';
        }
        location.href = redirectUrl += '&userName=' + encodeURIComponent(userName);
    }

    /**
     * サインアップ
     */
    public async signUp() {
        const url = '/api/authorize/signIn';
        const result = await this.http.get<any>(url, {}).toPromise();
        console.log(result.url);
        const signupUrl = (<string>result.url).replace(/\/authorize/, '/signup');
        location.href = signupUrl;
    }

    /**
    * サインアウト
    */
    public async signOut() {
        const url = '/api/authorize/signOut';
        const result = await this.http.get<any>(url, {}).toPromise();
        console.log(result.url);
        location.href = result.url;
    }

    /**
    * @method createOption
    */
    public async createOption() {
        await this.authorize();

        return {
            endpoint: this.endpoint,
            auth: this.auth
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
        const result = await this.http.post<{
            credentials: { accessToken: string; };
            userName?: string;
            clientId: string;
            endpoint: string;
        }>(url, body).toPromise();
        const option = {
            domain: '',
            clientId: result.clientId,
            redirectUri: '',
            logoutUri: '',
            responseType: '',
            scope: '',
            state: '',
            nonce: null,
            tokenIssuer: ''
        };
        this.auth = cinerino.createAuthInstance(option);
        this.auth.setCredentials(result.credentials);
        this.userName = result.userName;
        this.endpoint = result.endpoint;
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
        const result = await this.http.get<{
            version: string;
        }>(url).toPromise();
        return result.version;
    }
}