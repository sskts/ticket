/**
 * sasaki-api
 */
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class SasakiServiceStub {
    public credentials: any;
    public auth: any;
    public events: any;
    public people: any;
    public place: any;

    constructor() {
        this.credentials = null;

        this.auth = {
            signIn: () => {
                return Promise.resolve({});
            },
            signOut: () => {
                return Promise.resolve({});
            },
            isSignedIn: () => {
                return Promise.resolve({});
            }
        };

        this.people = {
            updateContacts: () => {
                return Promise.resolve({});
            },
            searchReservationOwnerships: () => {
                return Promise.resolve({});
            },
            getContacts: () => {
                return Promise.resolve({});
            },
            findCreditCards: () => {
                return Promise.resolve({});
            }
        };

        this.events = {
            searchIndividualScreeningEvent: () => {
                return Promise.resolve({});
            }
        };

        this.place = {
            searchMovieTheaters: () => {
                return Promise.resolve({});
            }
        };
    }
}
