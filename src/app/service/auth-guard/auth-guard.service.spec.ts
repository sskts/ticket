
/**
 * AuthGuardServiceテスト
 */
import { async, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import * as moment from 'moment';
import { AwsCognitoService } from '../aws-cognito/aws-cognito.service';
import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {

    it('canActivate 認証済', async () => {
        const routerStub: any = {};
        const awsCognitoServiceStub: any = {
            authenticateWithTerminal: () => {
                return Promise.resolve();
            },
            isAuthenticate: () => {
                return true;
            },
            getRecords: () => {
                return Promise.resolve({
                    updateAt: moment().toISOString()
                });
            },
            updateRecords: () => {
                return Promise.resolve();
            }
        };
        const service = new AuthGuardService(routerStub, awsCognitoServiceStub);
        const canActivate = await service.canActivate();
        expect(canActivate).toBeTruthy();
    });

    it('canActivate ユーザー情報なし', async () => {
        const routerStub: any = {
            navigate: () => { }
        };
        const awsCognitoServiceStub: any = {
            authenticateWithTerminal: () => {
                return Promise.resolve();
            },
            isAuthenticate: () => {
                return true;
            },
            getRecords: () => {
                return Promise.resolve({});
            },
            updateRecords: () => {
                return Promise.resolve();
            }
        };
        const service = new AuthGuardService(routerStub, awsCognitoServiceStub);
        const canActivate = await service.canActivate();
        expect(canActivate).toBeFalsy();
    });

    it('canActivate 未認証', async () => {
        const routerStub: any = {
            navigate: () => { }
        };
        const awsCognitoServiceStub: any = {
            authenticateWithTerminal: () => {
                return Promise.resolve();
            },
            isAuthenticate: () => {
                return false;
            },
            getRecords: () => {
                return Promise.resolve({});
            },
            updateRecords: () => {
                return Promise.resolve();
            }
        };
        const service = new AuthGuardService(routerStub, awsCognitoServiceStub);
        const canActivate = await service.canActivate();
        expect(canActivate).toBeFalsy();
    });
});
