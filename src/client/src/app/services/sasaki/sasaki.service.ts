import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as sasaki from '@motionpicture/sskts-api-javascript-client';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import { StorageService } from '../storage/storage.service';
import { UtilService } from '../util/util.service';

enum MemberType {
    NotMember = '0',
    Member = '1'
}

@Injectable()
export class SasakiService {

    public auth: sasaki.IImplicitGrantClient;
    public userName?: string;
    public event: sasaki.service.Event;
    public order: sasaki.service.Order;
    public organization: sasaki.service.Organization;
    public person: sasaki.service.Person;
    public place: sasaki.service.Place;
    public transaction: {
        placeOrder: sasaki.service.transaction.PlaceOrder
    };
    public programMembership: sasaki.service.ProgramMembership;

    constructor(
        private http: HttpClient,
        private storage: StorageService,
        private util: UtilService
    ) { }

    /**
     * getServices
     */
    public async getServices(): Promise<void> {
        try {
            const option = await this.createOption();
            this.event = new sasaki.service.Event(option);
            this.order = new sasaki.service.Order(option);
            this.organization = new sasaki.service.Organization(option);
            this.person = new sasaki.service.Person(option);
            this.place = new sasaki.service.Place(option);
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
    public async signIn() {
        const url = '/api/authorize/signIn';
        const result = await this.http.get<any>(url, {}).toPromise();
        console.log(result.url);
        location.href = result.url;
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
            endpoint: environment.SSKTS_API_ENDPOINT,
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
        const options = {
            params: new HttpParams().set('member', memberType)
        };
        let result;
        try {
            result = await this.http.get<{
                credentials: {
                    accessToken: string;
                };
                userName?: string;
            }>(url, options).toPromise();
        } catch (err) {
            if (memberType === MemberType.Member) {
                await this.signIn();
                const time = 3000;
                await this.util.sleep(time);

                return;
            }
            throw err;
        }
        const option = {
            domain: '',
            clientId: '',
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
    }
}
