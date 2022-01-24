/**
 * AuthGuardService
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AwsCognitoService } from '../services/aws-cognito.service';
import { CinerinoService } from '../services/cinerino.service';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
    constructor(
        private router: Router,
        private cinerinoService: CinerinoService,
        private userService: UserService,
        private awsCognitoService: AwsCognitoService
    ) {}

    /**
     * 認証
     * @method canActivate
     * @returns {Promise<boolean>}
     */
    public async canActivate(): Promise<boolean> {
        this.userService.load();
        if (!this.userService.isMember()) {
            const deviceId = localStorage.getItem('deviceId');
            if (deviceId === null) {
                throw new Error('deviceId is null');
            }
            this.awsCognitoService.authenticateWithDeviceId();
            return true;
        }
        try {
            await this.cinerinoService.authorize();
        } catch {
            try {
                await this.cinerinoService.signIn(true);
            } catch (e) {
                console.error(e);
                this.router.navigate(['/auth/select']);
            }
            return false;
        }
        try {
            await this.awsCognitoService.authorize();
        } catch {
            try {
                await this.awsCognitoService.signIn();
            } catch (e) {
                console.error(e);
                this.router.navigate(['/auth/select']);
            }
            return false;
        }
        const userName = await this.awsCognitoService.getUserName();
        this.userService.data.userName = userName;
        this.userService.data.prevUserName = userName;
        this.userService.save();
        return true;
    }
}
