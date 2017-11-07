/**
 * AuthGuardService
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
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

            return true;
        } catch (err) {
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
                const userRecord = await this.awsCognito.getRecords('user');
                const userModel = new UserModel(userRecord);
                if (userModel.isFirst()) {
                    await this.awsCognito.updateRecords('user', userModel.convertToRecord());
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
        const userModel = new UserModel(userRecord);
        if (userModel.isFirst()) {
            this.router.navigate(['/walkThrough']);
            throw new Error('userCheck Error');
        }
    }

}
