/**
 * UserService
 */
import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import * as sasaki from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';
import { AwsCognitoService } from '../aws-cognito/aws-cognito.service';

type IMovieTheater = sasaki.factory.place.movieTheater.IPlaceWithoutScreeningRoom;

@Injectable()
export class UserService {
    public contacts: sasaki.factory.person.IContact;
    public creditCards: sasaki.factory.paymentMethod.paymentCard.creditCard.ICheckedCard[];
    public movieTheaters: IMovieTheater[];
    public select: {
        purchase: { date: string; theater: string; } | undefined;
    };

    constructor(
        private jsonp: Jsonp,
        private awsCognito: AwsCognitoService
    ) {
        this.movieTheaters = [];
        this.select = {
            purchase: undefined
        };
    }

    public async getSelect() {
        if (this.select.purchase === undefined) {
            try {
                const user = await this.awsCognito.getRecords('user');
                this.select.purchase = (user.select !== undefined && user.select.purchase !== undefined)
                    ? user.select.purchase
                    : { date: '', theater: '' };
            } catch (err) {
                throw err;
            }
        }

        return this.select;
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

    public async save() {
        this.awsCognito.updateRecords('user', {
            updateAt: moment().toISOString(),
            select: this.select
        });
    }

}
