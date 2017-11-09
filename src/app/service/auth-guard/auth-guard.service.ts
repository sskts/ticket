/**
 * AuthGuardService
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AwsCognitoService } from '../aws-cognito/aws-cognito.service';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private router: Router,
        private awsCognito: AwsCognitoService,
        private storage: StorageService
    ) { }

    public async canActivate(): Promise<boolean> {
        try {
            await this.awsCognitoAuthenticateCheck();
            await this.walkThroughCheck();

            return true;
        } catch (err) {
            console.log('canActivate', err);

            return false;
        }
    }

    /**
     * awsCognitoへ認証確認
     */
    private async awsCognitoAuthenticateCheck(): Promise<void> {
        const isAuthenticate = this.awsCognito.isAuthenticate();
        if (!isAuthenticate) {
            try {
                await this.awsCognito.authenticateWithTerminal();
            } catch (err) {
                this.router.navigate(['/error']);
                throw err;
            }
        }
    }

    /**
     * walkThrough確認
     */
    private async walkThroughCheck(): Promise<void> {
        const info = this.storage.load('info');
        if (info === null) {
            this.router.navigate(['/walkThrough']);
            throw new Error('userCheck Error');
        }
    }

}
