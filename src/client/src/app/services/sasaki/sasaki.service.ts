import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as sasaki from '@motionpicture/sskts-api-javascript-client';
import 'rxjs/add/operator/toPromise';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class SasakiService {

    public auth: sasaki.IImplicitGrantClient;
    public userName?: string;
    public event: sasaki.service.Event;
    public order: sasaki.service.Order;
    public seller: sasaki.service.Seller;
    public person: sasaki.service.Person;
    public ownerShip: sasaki.service.person.OwnershipInfo;
    public transaction: {
        placeOrder: sasaki.service.transaction.PlaceOrder
    };
    public programMembership: sasaki.service.ProgramMembership;
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
            this.event = new sasaki.service.Event(option);
            this.order = new sasaki.service.Order(option);
            this.seller = new sasaki.service.Seller(option);
            this.person = new sasaki.service.Person(option);
            this.ownerShip = new sasaki.service.person.OwnershipInfo(option);
            this.transaction = {
                placeOrder: new sasaki.service.transaction.PlaceOrder(option)
            };
            this.programMembership = new sasaki.service.ProgramMembership(option);
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
        this.auth = sasaki.createAuthInstance(option);
        this.auth.setCredentials(result.credentials);
        this.userName = result.userName;
        this.endpoint = result.endpoint;
    }
}
