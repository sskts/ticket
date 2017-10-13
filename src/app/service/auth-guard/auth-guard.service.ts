/**
 * AuthGuardService
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AwsCognitoService } from '../aws-cognito/aws-cognito.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private router: Router,
        private awsCognito: AwsCognitoService
    ) { }

    public async canActivate(): Promise<boolean> {
        const isAuthenticate = this.awsCognito.isAuthenticate();
        if (!isAuthenticate) {
            this.router.navigate(['/error']);
        }

        return isAuthenticate;
    }

}
