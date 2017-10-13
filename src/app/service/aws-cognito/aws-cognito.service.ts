/**
 * AwsCognitoService
 */
import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { environment } from '../../../environments/environment';

@Injectable()
export class AwsCognitoService {
    public static REGION: string = environment.region;
    public static IDENTITY_POOL_ID: string = environment.identityPoolId;
    public static USER_POOL_ID: string = environment.userPoolId;
    public static CLIENT_ID: string = environment.clientId;

    public credentials: null | AWS.CognitoIdentityCredentials;

    constructor() {
        this.credentials = null;
    }

    /**
     * 端末IDで認証
     */
    public async authenticateWithTerminal() {
        AWS.config.region = AwsCognitoService.REGION;
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: AwsCognitoService.IDENTITY_POOL_ID
        });
        this.credentials = (<AWS.CognitoIdentityCredentials>AWS.config.credentials);
        await this.credentials.getPromise();
        console.log(this.credentials.identityId);
    }

    /**
     * 認証確認
     */
    public isAuthenticate(): boolean {
        return (this.credentials !== null);
    }

    /**
     * レコード更新
     * @param {string} datasetName
     * @param {value} value
     */
    public async updateRecords(datasetName: string, value: object) {
        await this.credentials.getPromise();
        const cognitoSync = new AWS.CognitoSync({
            credentials: this.credentials
        });
        const listRecords = await cognitoSync.listRecords({
            DatasetName: datasetName,
            IdentityId: this.credentials.identityId,
            IdentityPoolId: AwsCognitoService.IDENTITY_POOL_ID,
            LastSyncCount: 0
        }).promise();

        await cognitoSync.updateRecords({
            DatasetName: datasetName,
            IdentityId: this.credentials.identityId,
            IdentityPoolId: AwsCognitoService.IDENTITY_POOL_ID,
            SyncSessionToken: listRecords.SyncSessionToken,
            RecordPatches: this.convertToRecords(value, listRecords.DatasetSyncCount)
        }).promise();
        console.log('updateRecords');
    }

    /**
     * レコード取得
     * @param {string} datasetName
     */
    public async getRecords(datasetName: string) {
        await this.credentials.getPromise();
        const cognitoSync = new AWS.CognitoSync({
            credentials: this.credentials
        });
        const listRecords = await cognitoSync.listRecords({
            DatasetName: datasetName,
            IdentityId: this.credentials.identityId,
            IdentityPoolId: AwsCognitoService.IDENTITY_POOL_ID,
            LastSyncCount: 0
        }).promise();
        console.log('getRecords', this.convertToObjects(listRecords.Records));

        return this.convertToObjects(listRecords.Records);
    }

    /**
     * レコードの形式へ変換
     * @param {any} value
     * @param {number} count
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
     * レコードの形式へ変換
     * @param {any} records
     * @param {number} count
     */
    private convertToObjects(records: any): {
        Key: string;
        Op: string;
        SyncCount: number;
        Value: any;
    }[] {
        return records.map((record: {
            Key: string;
            Op: string;
            SyncCount: number;
            Value: string;
        }) => {
            return {
                Key: record.Key,
                Op: record.Op,
                SyncCount: record.SyncCount,
                Value: JSON.parse(record.Value)
            };
        });
    }

}
