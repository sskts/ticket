/**
 * UserStubService
 */
import { Injectable } from '@angular/core';
import * as sasaki from '@motionpicture/sskts-api-javascript-client';

export { UserService } from './user.service';

@Injectable()
export class UserStubService {
    public contacts: sasaki.factory.person.IContact;
    public creditCards: sasaki.factory.paymentMethod.paymentCard.creditCard.ICheckedCard[];

    constructor() {
        this.contacts = {
            givenName: '',
            familyName: '',
            telephone: '',
            email: ''
        };
    }

}
