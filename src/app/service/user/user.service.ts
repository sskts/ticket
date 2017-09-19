/**
 * UserService
 */
import { Injectable } from '@angular/core';
import * as sasaki from '@motionpicture/sskts-api-javascript-client';

@Injectable()
export class UserService {
  public contacts: sasaki.factory.person.IContact;
  public creditCards: sasaki.factory.paymentMethod.paymentCard.creditCard.ICheckedCard[];

  constructor() { }

}
