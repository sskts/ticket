/**
 * AuthGuardService
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AwsCognitoService } from '../services/aws-cognito.service';
import { CinerinoService } from '../services/cinerino.service';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(
        private router: Router,
        private cinerino: CinerinoService,
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
            await this.cinerino.authorize();

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
                await this.cinerino.signIn(true);
            } catch (e) {
                console.error(e);
                this.router.navigate(['/auth/select']);
            }

            return false;
        }
    }
}
