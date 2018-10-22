/**
 * AuthGuardService
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AwsCognitoService } from '../aws-cognito/aws-cognito.service';
import { SasakiService } from '../sasaki/sasaki.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private router: Router,
        private sasaki: SasakiService,
        private user: UserService,
        private awsCognito: AwsCognitoService
    ) { }

    /**
     * 認証
     * @method canActivate
     * @returns {Promise<boolean>}
     */
    public async canActivate(): Promise<boolean> {
        try {
            await this.sasaki.authorize();

            if (!this.user.isMember()) {
                const deviceId = localStorage.getItem('deviceId');
                if (deviceId === null) {
                    throw new Error('deviceId is null');
                }
                this.awsCognito.authenticateWithDeviceId();
            }

            return true;
        } catch (_) {
            try {
                await this.sasaki.signIn(true);
            } catch (e) {
                console.error(e);
                this.router.navigate(['/auth/select']);
            }

            return false;
        }
    }
}
