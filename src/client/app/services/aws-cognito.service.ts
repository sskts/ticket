/**
 * AwsCognitoService
 */
import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import * as moment from 'moment';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AwsCognitoService {
    public static REGION: string = environment.REGION;
    public static IDENTITY_POOL_ID: string = environment.IDENTITY_POOL_ID;
    public static USER_POOL_ID: string = environment.USER_POOL_ID;
    public static CLIENT_ID: string = environment.CLIENT_ID;

    public credentials?: AWS.CognitoIdentityCredentials;

    constructor() {}

    /**
     * 端末IDで認証
     * @method authenticateWithDeviceId
     * @returns {Promise<void>}
     */
    public async authenticateWithDeviceId(): Promise<void> {
        if (this.isAuthenticate()) {
            return;
        }
        AWS.config.update({ region: AwsCognitoService.REGION });
        const deviceId = localStorage.getItem('deviceId');
        if (deviceId === 'undefined' || deviceId === null) {
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: AwsCognitoService.IDENTITY_POOL_ID,
            });
        } else {
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: AwsCognitoService.IDENTITY_POOL_ID,
                IdentityId: deviceId,
            });
        }
        this.credentials = <AWS.CognitoIdentityCredentials>(
            AWS.config.credentials
        );
        await this.credentials.getPromise();
        if (deviceId === 'undefined' || deviceId === null) {
            localStorage.setItem('deviceId', this.credentials.identityId);
        }
    }

    /**
     * ユーザー取得
     */
    private async getUser(params: {
        accessToken: string;
    }): Promise<AWS.CognitoIdentityServiceProvider.GetUserResponse> {
        return new Promise((resolve, reject) => {
            AWS.config.update({ region: AwsCognitoService.REGION });
            const { accessToken } = params;
            const cognitoIdentityServiceProvider =
                new AWS.CognitoIdentityServiceProvider();
            cognitoIdentityServiceProvider.getUser(
                { AccessToken: accessToken },
                (err, data) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(data);
                }
            );
        });
    }

    /**
     * プロフィール取得
     */
    public async getProfile(params: { accessToken: string }): Promise<{
        additionalProperty?: { name: string; value: string }[];
        email?: string;
        givenName?: string;
        familyName?: string;
        telephone?: string;
    }> {
        const { accessToken } = params;
        const user = await this.getUser({ accessToken });
        const profile: {
            additionalProperty?: { name: string; value: string }[];
            email?: string;
            givenName?: string;
            familyName?: string;
            telephone?: string;
        } = {
            additionalProperty: undefined,
            email: undefined,
            givenName: undefined,
            familyName: undefined,
            telephone: undefined,
        };
        profile.additionalProperty = user.UserAttributes.filter(
            (a) => a.Value !== undefined
        ).map((a) => ({
            name: a.Name,
            value: <string>a.Value,
        }));
        user.UserAttributes.forEach((a) => {
            if (a.Name === 'email') {
                profile[a.Name] = a.Value;
            }
            if (a.Name === 'phone_number') {
                profile.telephone = a.Value;
            }
            if (a.Name === 'family_name') {
                profile.familyName = a.Value;
            }
            if (a.Name === 'given_name') {
                profile.givenName = a.Value;
            }
        });
        return profile;
    }

    /**
     * 属性更新
     */
    private async updateUserAttributes(params: {
        accessToken: string;
        userAttributes: AWS.CognitoIdentityServiceProvider.AttributeListType;
    }): Promise<AWS.CognitoIdentityServiceProvider.UpdateUserAttributesResponse> {
        return new Promise((resolve, reject) => {
            AWS.config.update({ region: AwsCognitoService.REGION });
            const { accessToken, userAttributes } = params;
            const cognitoIdentityServiceProvider =
                new AWS.CognitoIdentityServiceProvider();
            cognitoIdentityServiceProvider.updateUserAttributes(
                {
                    AccessToken: accessToken,
                    UserAttributes: userAttributes,
                },
                (err, data) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(data);
                }
            );
        });
    }

    /**
     * プロフィール更新
     */
    public async updateProfile(params: {
        accessToken: string;
        profile: {
            additionalProperty?: { name: string; value: string }[];
            email?: string;
            givenName?: string;
            familyName?: string;
            telephone?: string;
        };
    }): Promise<void> {
        const { accessToken, profile } = params;
        const userAttributes: AWS.CognitoIdentityServiceProvider.AttributeListType =
            [];
        Object.keys(profile).forEach((key) => {
            if (key === 'additionalProperty') {
                return;
            }
            if (key === 'email') {
                userAttributes.push({ Name: 'email', Value: profile.email });
            }
            if (key === 'givenName') {
                userAttributes.push({
                    Name: 'given_name',
                    Value: profile.givenName,
                });
            }
            if (key === 'familyName') {
                userAttributes.push({
                    Name: 'family_name',
                    Value: profile.familyName,
                });
            }
            if (key === 'telephone') {
                userAttributes.push({
                    Name: 'phone_number',
                    Value: profile.telephone,
                });
            }
        });
        if (profile.additionalProperty !== undefined) {
            profile.additionalProperty.forEach((a) => {
                if (a.name.match(/custom\:/) !== null) {
                    userAttributes.push({
                        Name: a.name,
                        Value: a.value,
                    });
                }
            });
        }
        await this.updateUserAttributes({ accessToken, userAttributes });
    }

    /**
     * 認証確認
     * @method isAuthenticate
     * @returns {boolean}
     */
    public isAuthenticate(): boolean {
        return (
            this.credentials !== undefined &&
            this.credentials.identityId !== undefined &&
            this.credentials.identityId.length > 0
        );
    }

    /**
     * レコード更新
     * @param {string} datasetName
     * @param {value} value
     * @returns {Promise<any>}
     */
    public async updateRecords(args: {
        datasetName: string;
        value: any;
    }): Promise<any> {
        if (this.credentials === undefined) {
            throw new Error('credentials is undefined');
        }
        await this.credentials.getPromise();
        const cognitoSync = new AWS.CognitoSync({
            credentials: this.credentials,
        });
        const listRecords = await cognitoSync
            .listRecords({
                DatasetName: args.datasetName,
                IdentityId: this.credentials.identityId,
                IdentityPoolId: AwsCognitoService.IDENTITY_POOL_ID,
                LastSyncCount: 0,
            })
            .promise();
        if (
            listRecords.DatasetSyncCount === undefined ||
            listRecords.SyncSessionToken === undefined
        ) {
            throw new Error(
                'listRecords: Records or DatasetSyncCount or SyncSessionToken is undefined'
            );
        }
        if (listRecords.Records === undefined) {
            listRecords.Records = [];
        }
        args.value.updateAt = moment().toISOString();
        const mergeValue = this.convertToObjects(listRecords.Records);
        Object.assign(mergeValue, args.value);

        const updateRecords = await cognitoSync
            .updateRecords({
                DatasetName: args.datasetName,
                IdentityId: this.credentials.identityId,
                IdentityPoolId: AwsCognitoService.IDENTITY_POOL_ID,
                SyncSessionToken: listRecords.SyncSessionToken,
                RecordPatches: this.convertToRecords(
                    mergeValue,
                    listRecords.DatasetSyncCount
                ),
            })
            .promise();
        if (updateRecords.Records === undefined) {
            updateRecords.Records = [];
        }

        return this.convertToObjects(updateRecords.Records);
    }

    /**
     * レコード取得
     * @param {string} datasetName
     * @returns {Promise<any>}
     */
    public async getRecords(args: { datasetName: string }): Promise<any> {
        if (this.credentials === undefined) {
            throw new Error('credentials is undefined');
        }
        await this.credentials.getPromise();
        const cognitoSync = new AWS.CognitoSync({
            credentials: this.credentials,
        });
        const listRecords = await cognitoSync
            .listRecords({
                DatasetName: args.datasetName,
                IdentityId: this.credentials.identityId,
                IdentityPoolId: AwsCognitoService.IDENTITY_POOL_ID,
                LastSyncCount: 0,
            })
            .promise();
        if (listRecords.Records === undefined) {
            listRecords.Records = [];
        }
        // console.log('getRecords', this.convertToObjects(listRecords.Records));

        return <any>this.convertToObjects(listRecords.Records);
    }

    /**
     * レコードの形式へ変換
     * @param {any} value
     * @param {number} count
     * @returns {{ Key: string; Op: string; SyncCount: number; Value: string; }[]}
     */
    private convertToRecords(
        value: any,
        count: number
    ): {
        Key: string;
        Op: string;
        SyncCount: number;
        Value: string;
    }[] {
        return Object.keys(value).map((key: string) => {
            return {
                Key: key,
                Op: 'replace',
                SyncCount: count,
                Value: JSON.stringify(value[key]),
            };
        });
    }

    /**
     * オブジェクトの形式へ変換
     * @param {any[]} records
     * @param {number} count
     * @returns {Object}
     */
    private convertToObjects(records: any[]): Object {
        const result: any = {};
        records.forEach(
            (record: {
                Key: string;
                Op: string;
                SyncCount: number;
                Value: string;
            }) => {
                result[record.Key] = JSON.parse(record.Value);
            }
        );

        return result;
    }
}
