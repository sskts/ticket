import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as cinerino from '@cinerino/sdk';
import 'rxjs/add/operator/toPromise';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class CinerinoService {

    public auth: cinerino.auth.ClientCredentials | cinerino.auth.OAuth2;
    public userName?: string;
    public event: cinerino.service.Event;
    public offer: cinerino.service.Offer;
    public order: cinerino.service.Order;
    public seller: cinerino.service.Seller;
    public payment: cinerino.service.Payment;
    public person: cinerino.service.Person;
    public product: cinerino.service.Product;
    public ownerShipInfo: cinerino.service.person.OwnershipInfo;
    public transaction: {
        placeOrder: cinerino.service.transaction.PlaceOrder
    };
    private endpoint: string;
    private waiterServerUrl: string;
    private projectId: string;

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
            this.offer = new cinerino.service.Offer(option);
            this.seller = new cinerino.service.Seller(option);
            this.payment = new cinerino.service.Payment(option);
            this.person = new cinerino.service.Person(option);
            this.product = new cinerino.service.Product(option);
            this.ownerShipInfo = new cinerino.service.person.OwnershipInfo(option);
            this.transaction = {
                placeOrder: new cinerino.service.transaction.PlaceOrder(option)
            };
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
            auth: this.auth,
            project: { id: this.projectId }
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
            projectId: string;
            waiterServerUrl: string;
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
        this.waiterServerUrl = result.waiterServerUrl;
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
        const result = await this.http.get<{
            version: string;
        }>(url).toPromise();
        return result.version;
    }

    /**
     * パスポート取得
     */
     public async getPassport(params: {
        scope: string;
    }) {
        if (this.waiterServerUrl === undefined
            || this.waiterServerUrl === '') {
            return { token: '' };
        }
        const url = `${this.waiterServerUrl}/projects/${this.projectId}/passports`;
        const body = { scope: params.scope };
        const result = await this.http.post<{ token: string; }>(url, body).toPromise();

        return result;
    }
}
