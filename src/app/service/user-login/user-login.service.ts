import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import * as STS from 'aws-sdk/clients/sts';
import * as AWS from 'aws-sdk/global';
import { environment } from '../../../environments/environment';
import { CognitoCallback, CognitoUtil, LoggedInCallback } from '../cognito/cognito.service';

/**
 * 会員ログインサービス
 */
@Injectable()
export class UserLoginService {
    constructor(
        private cognitoUtil: CognitoUtil
    ) {
    }

    /**
     * ユーザーネームとパスワードで認証する
     * @param username ユーザーネーム
     * @param password パスワード
     */
    public async authenticate(username: string, password: string) {
        return new Promise<{
            message: string;
            result: any
        }>((resolve) => {
            console.log('UserLoginService: starting the authentication');

            const authenticationData = {
                Username: username,
                Password: password
            };
            const authenticationDetails = new AuthenticationDetails(authenticationData);

            const userData = {
                Username: username,
                Pool: this.cognitoUtil.getUserPool()
            };

            console.log('UserLoginService: Params set...Authenticating the user');
            const cognitoUser = new CognitoUser(userData);
            console.log(`UserLoginService: config is ${AWS.config}`);
            cognitoUser.authenticateUser(authenticationDetails, {
                newPasswordRequired: (userAttributes, requiredAttributes) => {
                    console.log('userAttributes', userAttributes);
                    console.log('requiredAttributes', requiredAttributes);
                    resolve({
                        message: 'User needs to set password.',
                        result: null
                    });
                },
                onSuccess: async (result) => {
                    console.log('In authenticateUser onSuccess callback');
                    const creds = await this.cognitoUtil.buildCognitoCreds(
                        CognitoUtil.getCognitoParametersForIdConsolidation(result.getIdToken().getJwtToken()).Logins
                    );

                    AWS.config.credentials = creds;

                    // So, when CognitoIdentity authenticates a user, it doesn't actually hand us the IdentityID,
                    // used by many of our other handlers. This is handled by some sly underhanded calls to AWS Cognito
                    // API's by the SDK itself, automatically when the first AWS SDK request is made that requires our
                    // security credentials. The identity is then injected directly into the credentials object.
                    // If the first SDK call we make wants to use our IdentityID, we have a
                    // chicken and egg problem on our hands. We resolve this problem by 'priming' the AWS SDK by calling a
                    // very innocuous API call that forces this behavior.
                    const clientParams: any = {};
                    if (environment.sts_endpoint) {
                        clientParams.endpoint = environment.sts_endpoint;
                    }
                    const sts = new STS(clientParams);
                    sts.getCallerIdentity({}, (err, data) => {
                        console.log('UserLoginService: Successfully set the AWS credentials');
                        console.log(err, data);
                        resolve({
                            message: null,
                            result: result
                        });
                    });

                },
                onFailure: (err) => {
                    resolve({
                        message: err.message,
                        result: null
                    });
                }
            });
        });
    }

    /**
     * ユーザーネームからパスワード忘れプロセスを実行する
     * @param username ユーザーネーム
     * @param callback 実行後処理
     */
    public forgotPassword(username: string, callback: CognitoCallback) {
        const userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.forgotPassword({
            onSuccess: () => {
            },
            onFailure: (err) => {
                callback.cognitoCallback(err.message, null);
            },
            inputVerificationCode() {
                callback.cognitoCallback(null, null);
            }
        });
    }

    /**
     * 新パスワードを登録する
     * @param username ユーザーネーム
     * @param verificationCode 確認コード
     * @param password 新パスワード
     * @param callback 実行後処理
     */
    public confirmNewPassword(username: string, verificationCode: string, password: string, callback: CognitoCallback) {
        const userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmPassword(verificationCode, password, {
            onSuccess: () => {
                callback.cognitoCallback(null, null);
            },
            onFailure: (err) => {
                callback.cognitoCallback(err.message, null);
            }
        });
    }

    /**
     * ログアウト
     */
    public logout() {
        console.log('UserLoginService: Logging out');
        this.cognitoUtil.getCurrentUser().signOut();
    }

    /**
     * 認証済かどうか
     */
    public async isAuthenticated(callback: LoggedInCallback) {
        if (callback == null) {
            throw new Error('UserLoginService: Callback in isAuthenticated() cannot be null');
        }

        const cognitoUser = this.cognitoUtil.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession(async (err: any, session: any) => {
                if (err) {
                    console.log('UserLoginService: Couldn\'t get the session', err, err.stack);
                    await callback.isLoggedIn(err, false);
                } else {
                    console.log(`UserLoginService: Session is ${session.isValid()}`);
                    await callback.isLoggedIn(err, session.isValid());
                }
            });
        } else {
            console.log('UserLoginService: can\'t retrieve the current user');
            await callback.isLoggedIn('Can\'t retrieve the CurrentUser', false);
        }
    }
}
