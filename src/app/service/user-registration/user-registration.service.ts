/**
 * 会員登録サービス
 */
import { Inject, Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk/global';
import { CognitoCallback, CognitoUtil } from '../cognito/cognito.service';

@Injectable()
export class UserRegistrationService {
    constructor( @Inject(CognitoUtil) public cognitoUtil: CognitoUtil) {
    }

    /**
     * 登録する
     * @param {string} user 登録したいユーザー情報
     * @param {CognitoCallback} callback 実行後処理
     */
    public register(
        user: {
            username: string;
            email: string;
            password: string;
            givenName: string;
            familyName: string;
            phoneNumber: string;
        },
        callback: CognitoCallback
    ): void {
        console.log(`UserRegistrationService: user is ${user}`);

        const attributeList = [];

        const dataEmail = {
            Name: 'email',
            Value: user.email
        };
        const dataGivenName = {
            Name: 'given_name',
            Value: user.givenName
        };
        const dataFamilyName = {
            Name: 'family_name',
            Value: user.familyName
        };
        const dataPhoneNumber = {
            Name: 'phone_number',
            Value: user.phoneNumber
        };
        attributeList.push(new CognitoUserAttribute(dataEmail));
        attributeList.push(new CognitoUserAttribute(dataGivenName));
        attributeList.push(new CognitoUserAttribute(dataFamilyName));
        attributeList.push(new CognitoUserAttribute(dataPhoneNumber));

        this.cognitoUtil.getUserPool().signUp(user.username, user.password, attributeList, null, (err, result) => {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                console.log(`UserRegistrationService: registered user is ${result}`);
                callback.cognitoCallback(null, result);
            }
        });

    }

    /**
     * 登録確認コードを検証する
     * @param {string} username ユーザーネーム
     * @param {string} confirmationCode 確認コード
     * @param {CognitoCallback} callback 実行後処理
     */
    public confirmRegistration(username: string, confirmationCode: string, callback: CognitoCallback): void {
        const userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                callback.cognitoCallback(null, result);
            }
        });
    }

    /**
     * 確認コードを再送信する
     * @param {string} username ユーザーネーム
     * @param {CognitoCallback} callback 実行後処理
     */
    public resendCode(username: string, callback: CognitoCallback): void {
        const userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.resendConfirmationCode((err, result) => {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                callback.cognitoCallback(null, result);
            }
        });
    }

    /**
     * パスワードを変更する
     * @param {NewPasswordUser} newPasswordUser 新パスワードユーザー
     * @param {CognitoCallback} callback 実行後処理
     */
    public newPassword(
        newPasswordUser: {
            username: string;
            existingPassword: string;
            password: string;
        },
        callback: CognitoCallback
    ): void {
        console.log(newPasswordUser);
        // Get these details and call
        // cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this);
        const authenticationData = {
            Username: newPasswordUser.username,
            Password: newPasswordUser.existingPassword
        };
        const authenticationDetails = new AuthenticationDetails(authenticationData);

        const userData = {
            Username: newPasswordUser.username,
            Pool: this.cognitoUtil.getUserPool()
        };

        console.log('UserLoginService: Params set...Authenticating the user');
        const cognitoUser = new CognitoUser(userData);
        console.log(`UserLoginService: config is ${AWS.config}`);
        cognitoUser.authenticateUser(authenticationDetails, {
            newPasswordRequired: (userAttributes, requiredAttributes) => {
                // User was signed up by an admin and must provide new
                // password and required attributes, if any, to complete
                // authentication.

                // the api doesn't accept this field back
                delete userAttributes.email_verified;
                cognitoUser.completeNewPasswordChallenge(newPasswordUser.password, requiredAttributes, {
                    onSuccess: (result) => {
                        console.log(result);
                        callback.cognitoCallback(null, userAttributes);
                    },
                    onFailure: (err) => {
                        callback.cognitoCallback(err, null);
                    }
                });
            },
            onSuccess: (result) => {
                callback.cognitoCallback(null, result);
            },
            onFailure: (err) => {
                callback.cognitoCallback(err, null);
            }
        });
    }
}
