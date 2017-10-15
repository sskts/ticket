/**
 * AuthGuardService
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as moment from 'moment';

import { UserModel } from '../../model/user/user.model';
import { AwsCognitoService } from '../aws-cognito/aws-cognito.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private router: Router,
        private awsCognito: AwsCognitoService
    ) { }

    public async canActivate(): Promise<boolean> {
        try {
            await this.awsCognitoAuthenticateCheck();
            await this.userCheck();
        } catch (err) {
            console.log('AuthGuardService', err);
        }

        return true;
    }

    /**
     * awsCognitoへ認証確認
     */
    private async awsCognitoAuthenticateCheck(): Promise<void> {
        const isAuthenticate = this.awsCognito.isAuthenticate();
        if (!isAuthenticate) {
            try {
                await this.awsCognito.authenticateWithTerminal();
                const userRecord = await this.awsCognito.getRecords('user');
                const user = new UserModel(userRecord);
                if (user.updateAt !== undefined) {
                    user.updateAt = moment().toISOString();
                    await this.awsCognito.updateRecords('user', user.convertToRecord());
                }
            } catch (err) {
                this.router.navigate(['/error']);
                throw err;
            }
        }
    }

    /**
     * ユーザー確認
     */
    private async userCheck(): Promise<void> {
        const userRecord = await this.awsCognito.getRecords('user');
        const user = new UserModel(userRecord);
        console.log('user', user);
        if (user.updateAt === undefined) {
            this.router.navigate(['/walkThrough']);
            throw new Error('userRecords.length === 0');
        }
    }

}
