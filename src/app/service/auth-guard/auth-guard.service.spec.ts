
/**
 * AuthGuardServiceテスト
 */
import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SasakiService, SasakiStubService } from '../../service/sasaki/sasaki-stub.service';
import { UserService, UserStubService } from '../../service/user/user-stub.service';
import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthGuardService,
                { provide: SasakiService, useClass: SasakiStubService },
                { provide: UserService, useClass: UserStubService }
            ],
            imports: [
                RouterTestingModule.withRoutes([])
            ]
        });
    });

    it('canActivate 認証済', inject([AuthGuardService], async (service: AuthGuardService) => {
        expect(service).toBeTruthy();
        const result = await service.canActivate();
        expect(result).toBeTruthy();
    }));

    it('canActivate 未認証', inject([AuthGuardService], async (service: AuthGuardService) => {
        // spyOn(SasakiStubService.prototype, 'auth').and.returnValue(Promise.resolve(null));
        // expect(service).toBeTruthy();
        // const result = await service.canActivate();
        // console.log('canActivate 未認証', result)
        // expect(result).toBeFalsy();
    }));
});
