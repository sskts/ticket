
/**
 * AuthGuardServiceテスト
 */
import { async, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SasakiStubService } from '../../service/sasaki/sasaki-stub.service';
import { UserStubService } from '../../service/user/user-stub.service';
import { RouterStub } from '../../testing/router-stubs';
import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {

    it('canActivate 認証済', async () => {
        const sasaki: any = new SasakiStubService();
        const router: any = new RouterStub();
        const user: any = new UserStubService();
        const service = new AuthGuardService(sasaki, router, user);
        await expect(service).toBeTruthy();
        const result = await service.canActivate();
        await expect(result).toBeTruthy();
    });

    it('canActivate 認証済 ユーザー情報なし', async () => {
        const sasaki: any = new SasakiStubService();
        const router: any = new RouterStub();
        const user: any = new UserStubService();
        user.contacts = undefined;
        user.creditCards = undefined;
        const service = new AuthGuardService(sasaki, router, user);
        await expect(service).toBeTruthy();
        const result = await service.canActivate();
        await expect(result).toBeTruthy();
    });

    it('canActivate 未認証', async () => {
        const sasaki: any = new SasakiStubService();
        const router: any = new RouterStub();
        const user: any = new UserStubService();
        spyOn(sasaki.auth, 'isSignedIn').and.returnValue(Promise.resolve(null));
        const service = new AuthGuardService(sasaki, router, user);
        await expect(service).toBeTruthy();
        const result = await service.canActivate();
        await expect(result).toBeFalsy();
    });
});
