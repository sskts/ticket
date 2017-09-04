/**
 * AuthGuardService
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { SasakiService } from '../../service/sasaki/sasaki.service';
import { UserService } from '../../service/user/user.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private sasaki: SasakiService,
    private router: Router,
    private user: UserService
  ) { }

  public async canActivate(): Promise<boolean> {
    console.log('canActivate');
    try {
      const isSignedIn = await this.sasaki.auth.isSignedIn();
      console.log('isSignedIn', isSignedIn);
      if (isSignedIn === null) {
        throw new Error('isSignedIn is null');
      }
    } catch (err) {
      console.log('非ログイン', err);
      this.router.navigate(['/auth/login']);

      return false;
    }
    if (this.user.contacts === undefined) {
      this.user.contacts = await this.sasaki.people.getContacts({
        personId: 'me'
      });
    }
    if (this.user.creditCards === undefined) {
      this.user.creditCards = await this.sasaki.people.findCreditCards({
        personId: 'me'
      });
    }

    return true;
  }

}
