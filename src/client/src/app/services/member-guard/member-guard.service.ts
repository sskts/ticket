import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SasakiService } from '../sasaki/sasaki.service';

@Injectable()
export class MemberGuardService implements CanActivate {

    constructor(
        private router: Router,
        private sasaki: SasakiService
    ) { }

    /**
     * 認証
     * @method canActivate
     * @returns {Promise<boolean>}
     */
    public async canActivate(): Promise<boolean> {
        if (this.sasaki.isMember()) {
            return true;
        } else {
            this.router.navigate(['/auth/select']);

            return false;
        }
    }

}
