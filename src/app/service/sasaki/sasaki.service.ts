/**
 * sasaki-api
 */
import { Injectable } from '@angular/core';
import * as sasaki from '@motionpicture/sasaki-api';
import { environment } from '../../../environments/environment';

interface IOptions {
    domain: string;
    clientId: string;
    redirectUri: string;
    logoutUri: string;
    responseType: string;
    responseMode?: string;
    scope: string;
    state: string;
    nonce: string | null;
    audience?: string;
    tokenIssuer: string;
}

@Injectable()
export class SasakiService {
    public credentials: any;
    public auth: sasaki.IImplicitGrantClient;
    public events: sasaki.service.Event;
    public people: sasaki.service.Person;
    public place: sasaki.service.Place;

    constructor() {
        this.credentials = null;

        const scopes = [
            'phone', 'openid', 'email', 'aws.cognito.signin.user.admin', 'profile',
            'https://sskts-api-development.azurewebsites.net/transactions',
            'https://sskts-api-development.azurewebsites.net/events.read-only',
            'https://sskts-api-development.azurewebsites.net/organizations.read-only',
            'https://sskts-api-development.azurewebsites.net/people.contacts',
            'https://sskts-api-development.azurewebsites.net/people.creditCards',
            'https://sskts-api-development.azurewebsites.net/people.ownershipInfos.read-only',
            'https://sskts-api-development.azurewebsites.net/places.read-only'
        ];

        const options: IOptions = {
            domain: environment.sasakiAuthDomain,
            clientId: environment.clientId,
            responseType: 'token',
            redirectUri: environment.sasakiAuthRedirectUri,
            logoutUri: environment.sasakiAuthLogoutUri,
            scope: scopes.join(' '),
            state: '12345',
            nonce: null,
            tokenIssuer: environment.tokenIssuer
        };

        console.log('options-----', options, process);

        this.auth = sasaki.createAuthInstance(options);

        this.people = new sasaki.service.Person({
            auth: this.auth,
            endpoint: environment.sasakiAPIEndpoint
        });

        this.events = new sasaki.service.Event({
            auth: this.auth,
            endpoint: environment.sasakiAPIEndpoint
        });

        this.place = new sasaki.service.Place({
            auth: this.auth,
            endpoint: environment.sasakiAPIEndpoint
        });
    }
}
