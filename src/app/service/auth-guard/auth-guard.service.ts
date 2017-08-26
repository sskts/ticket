import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { SasakiService } from '../../service/sasaki/sasaki.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private sasakiService: SasakiService,
    private router: Router
  ) { }

  public async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    console.log('認証確認', route, state);
    const credentials = null;
    if (credentials === null) {
      this.router.navigate(['/auth/login']);

      return false;
    }
    return true;
  }

}
