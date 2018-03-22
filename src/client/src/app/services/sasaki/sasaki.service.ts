import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as sasaki from '@motionpicture/sskts-api-javascript-client';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import { StorageService, SaveType } from '../storage/storage.service';

@Injectable()
export class SasakiService {

    public auth: sasaki.IImplicitGrantClient;

    public event: sasaki.service.Event;
    public order: sasaki.service.Order;
    public organization: sasaki.service.Organization;
    public person: sasaki.service.Person;
    public place: sasaki.service.Place;
    public transaction: {
        placeOrder: sasaki.service.transaction.PlaceOrder
    };

    public member: MemberType;

    constructor(
        private http: HttpClient,
        private storage: StorageService
    ) {
        this.setMemberType();
    }

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
        } catch (err) {
            console.log(err);
            throw new Error('getServices is failed');
        }
    }

    /**
     * サインイン
     */
    public async signIn() {
        this.storage.save('member', {
            memberType: MemberType.Member
        }, SaveType.Local);
        this.setMemberType();
        const url = '/api/authorize/signIn';
        const result = await this.http.get<any>(url, {}).toPromise();
        console.log(result.url);
        location.href = result.url;
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
        if (this.auth === undefined
            || this.auth.credentials === undefined) {
            await this.authorize();
        }
        return {
            endpoint: environment.SSKTS_API_ENDPOINT,
            auth: this.auth
        };
    }

    /**
     * @method authorize
     */
    public async authorize() {
        this.setMemberType();
        const url = '/api/authorize/getCredentials';
        const options = {
            params: new HttpParams().set('member', this.member)
        };
        const credentials = await this.http.get<any>(url, options).toPromise();
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
        this.auth.setCredentials(credentials);
    }

    private setMemberType() {
        const member = this.storage.load('member', SaveType.Local);
        this.member = (member === null)
            ? MemberType.NotMember
            : MemberType.Member;
    }

}

export enum MemberType {
    NotMember = '0',
    Member = '1'
}
