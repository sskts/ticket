
// /**
//  * AuthGuardServiceテスト
//  */
// import { async, inject, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { RouterStub } from '../../testing/router-stubs';
// import { AwsCognitoService } from '../aws-cognito/aws-cognito.service';
// import { AuthGuardService } from './auth-guard.service';

// describe('AuthGuardService', () => {

//     it('canActivate 認証済', async () => {
//         const router: any = new RouterStub();
//         const awsCognitoService: any = new AwsCognitoService();
//         const service = new AuthGuardService(router, awsCognitoService);
//         await expect(service).toBeTruthy();
//         const result = await service.canActivate();
//         await expect(result).toBeTruthy();
//     });

//     it('canActivate 認証済 ユーザー情報なし', async () => {
//         const router: any = new RouterStub();
//         const awsCognitoService: any = new AwsCognitoService();
//         const service = new AuthGuardService(router, awsCognitoService);
//         await expect(service).toBeTruthy();
//         const result = await service.canActivate();
//         await expect(result).toBeTruthy();
//     });

//     it('canActivate 未認証', async () => {
//         const router: any = new RouterStub();
//         const awsCognitoService: any = new AwsCognitoService();
//         const service = new AuthGuardService(router, awsCognitoService);
//         await expect(service).toBeTruthy();
//         const result = await service.canActivate();
//         await expect(result).toBeFalsy();
//     });
// });
