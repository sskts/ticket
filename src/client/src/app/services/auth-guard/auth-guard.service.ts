/**
 * AuthGuardService
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SasakiService } from '../sasaki/sasaki.service';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private router: Router,
        private sasaki: SasakiService,
        private storage: StorageService
    ) { }

    /**
     * 認証
     * @method canActivate
     * @returns {Promise<boolean>}
     */
    public async canActivate(): Promise<boolean> {
        try {
            await this.sasaki.authorize();

            if (!this.sasaki.isMember()) {
                const deviceId = this.storage.load('deviceId');
                console.log(deviceId);
            }

            return true;
        } catch (err) {
            console.log('canActivate', err);
            this.router.navigate(['/auth']);

            return false;
        }
    }
}
