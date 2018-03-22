/**
 * AuthGuardService
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router, NavigationEnd } from '@angular/router';
import { SasakiService, MemberType } from '../sasaki/sasaki.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthGuardService implements CanActivate {

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
        try {
            await this.sasaki.authorize();
            if (this.sasaki.member === MemberType.Member) {
                // const event = await this.router.events.toPromise();
                // console.log('-----------------EVENT', event);
                // if (event instanceof NavigationEnd) {
                //     if (!/event.urlAfterRedirects/.test('member')) {
                //         this.router.navigate([`/member/${event.urlAfterRedirects}`]);
                //         return false;
                //     }
                // }
            }

            return true;
        } catch (err) {
            console.log('canActivate', err);
            this.router.navigate(['/auth']);

            return false;
        }
    }
}
