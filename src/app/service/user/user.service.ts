/**
 * UserService
 */
import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import * as sasaki from '@motionpicture/sskts-api-javascript-client';
import { environment } from '../../../environments/environment';

type IMovieTheater = sasaki.factory.place.movieTheater.IPlaceWithoutScreeningRoom;

@Injectable()
export class UserService {
    public contacts: sasaki.factory.person.IContact;
    public creditCards: sasaki.factory.paymentMethod.paymentCard.creditCard.ICheckedCard[];
    public movieTheaters: IMovieTheater[];
    public select: {
        purchase: {
            date: string;
            theater: string;
        }
    };

    constructor(private jsonp: Jsonp) {
        this.movieTheaters = [];
        this.select = {
            purchase : {
                date: '',
                theater: ''
            }
        };
    }

    public async getMovieTheaters() {
        if (this.movieTheaters.length === 0) {
            try {
                this.movieTheaters = await this.fitchMovieTheaters();
            } catch (err) {
                throw err;
            }
        }

        return this.movieTheaters;
    }

    public async fitchMovieTheaters() {
        const url = `${environment.ticketingSite}/purchase/performances/getMovieTheaters`;
        const options = {
            search: {
                callback: 'JSONP_CALLBACK'
            }
        };
        const response = await this.jsonp.get(url, options).retry(3).toPromise();
        console.log('response', response);
        if (response.json().error !== null) {
            throw new Error(response.json().error);
        }

        return response.json().result;
    }

}
