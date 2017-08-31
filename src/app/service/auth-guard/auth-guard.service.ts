import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { SasakiService } from '../../service/sasaki/sasaki.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private sasaki: SasakiService,
    private router: Router
  ) { }

  public async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    try {
      const isSignedIn = await this.sasaki.auth.isSignedIn();
      if (isSignedIn === null) {
        const result = await this.sasaki.auth.signIn();
        console.log('authorize result:', result);
        this.sasaki.credentials = result;
      }
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }

}
