/**
 * AwsCognitoService
 */
import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';

@Injectable()
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
        AWS.config.region = AwsCognitoService.REGION;
        const deviceId = localStorage.getItem('deviceId');
        if (deviceId === 'undefined' || deviceId === null) {
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: AwsCognitoService.IDENTITY_POOL_ID
            });
        } else {
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: AwsCognitoService.IDENTITY_POOL_ID,
                IdentityId: deviceId
            });
        }
        this.credentials = (<AWS.CognitoIdentityCredentials>AWS.config.credentials);
        await this.credentials.getPromise();
        if (deviceId === 'undefined' || deviceId === null) {
            localStorage.setItem('deviceId', this.credentials.identityId);
        }
    }

    /**
     * 認証確認
     * @method isAuthenticate
     * @returns {boolean}
     */
    public isAuthenticate(): boolean {
        return (this.credentials !== undefined
            && this.credentials.identityId !== undefined
            && this.credentials.identityId.length > 0);
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
            credentials: this.credentials
        });
        const listRecords = await cognitoSync.listRecords({
            DatasetName: args.datasetName,
            IdentityId: this.credentials.identityId,
            IdentityPoolId: AwsCognitoService.IDENTITY_POOL_ID,
            LastSyncCount: 0
        }).promise();
        if (listRecords.DatasetSyncCount === undefined
            || listRecords.SyncSessionToken === undefined) {
            throw new Error('listRecords: Records or DatasetSyncCount or SyncSessionToken is undefined');
        }
        if (listRecords.Records === undefined) {
            listRecords.Records = [];
        }
        args.value.updateAt = moment().toISOString();
        const mergeValue = this.convertToObjects(listRecords.Records);
        Object.assign(mergeValue, args.value);

        const updateRecords = await cognitoSync.updateRecords({
            DatasetName: args.datasetName,
            IdentityId: this.credentials.identityId,
            IdentityPoolId: AwsCognitoService.IDENTITY_POOL_ID,
            SyncSessionToken: listRecords.SyncSessionToken,
            RecordPatches: this.convertToRecords(mergeValue, listRecords.DatasetSyncCount)
        }).promise();
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
    public async getRecords(args: { datasetName: string; }): Promise<any> {
        if (this.credentials === undefined) {
            throw new Error('credentials is undefined');
        }
        await this.credentials.getPromise();
        const cognitoSync = new AWS.CognitoSync({
            credentials: this.credentials
        });
        const listRecords = await cognitoSync.listRecords({
            DatasetName: args.datasetName,
            IdentityId: this.credentials.identityId,
            IdentityPoolId: AwsCognitoService.IDENTITY_POOL_ID,
            LastSyncCount: 0
        }).promise();
        if (listRecords.Records === undefined) {
            listRecords.Records = [];
        }
        console.log('getRecords', this.convertToObjects(listRecords.Records));

        return (<any>this.convertToObjects(listRecords.Records));
    }

    /**
     * メールアドレスに送付されたコードを確認する
     * @param {string} accessToken
     * @param {string} code
     */
    public async verifyEmailAddress(accessToken: string, code: string) {
        AWS.config.region = environment.REGION;
        const credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: AwsCognitoService.IDENTITY_POOL_ID
        });
        await credentials.getPromise();
        const provider = new AWS.CognitoIdentityServiceProvider({
            apiVersion: 'latest',
            credentials: credentials,
        });
        return new Promise((resolve, reject) => {
            provider.verifyUserAttribute({
                AccessToken: accessToken,
                AttributeName: "email",
                Code: code
            }, async (err, _) => {
                if (err !== null) {
                    console.log(err);
                    reject(err);
                }else {
                    resolve();
                }
            });
        })
    }

    public async resendVerifyEmailCode(accessToken: string) {
        AWS.config.region = environment.REGION;
        const credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: AwsCognitoService.IDENTITY_POOL_ID
        });
        await credentials.getPromise();
        const provider = new AWS.CognitoIdentityServiceProvider({
            apiVersion: 'latest',
            credentials: credentials,
        });
        return new Promise((resolve, reject) => {
            provider.getUserAttributeVerificationCode({
                AccessToken: accessToken,
                AttributeName: 'email'
            }, async (err, _) => {
                if (err !== null) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * レコードの形式へ変換
     * @param {any} value
     * @param {number} count
     * @returns {{ Key: string; Op: string; SyncCount: number; Value: string; }[]}
     */
    private convertToRecords(value: any, count: number): {
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
                Value: JSON.stringify(value[key])
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
        records.forEach((record: {
            Key: string;
            Op: string;
            SyncCount: number;
            Value: string;
        }) => {
            result[record.Key] = JSON.parse(record.Value);
        });

        return result;
    }

}
