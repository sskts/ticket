/**
 * AuthGuardService
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { SasakiService } from '../../service/sasaki/sasaki.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private sasaki: SasakiService,
    private router: Router
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

    return true;
  }

}
