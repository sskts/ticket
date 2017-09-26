/**
 * AuthLoginComponentテスト
 */
import { Injectable } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { LoadingComponent } from '../../components/loading/loading.component';
import { SasakiService } from '../../service/sasaki/sasaki.service';
import { router } from '../../testing/router';
import { SasakiServiceStub } from '../../testing/sasaki.service';
import { AuthLoginComponent } from './auth-login.component';

describe('AuthLoginComponent', () => {

    it('should be created', async () => {
        await TestBed.configureTestingModule({
            declarations: [
                AuthLoginComponent,
                LoadingComponent
            ],
            providers: [
                { provide: SasakiService, useClass: SasakiServiceStub },
                { provide: Router, useValue: router }
            ]
        })
            .compileComponents();
        const fixture = TestBed.createComponent(AuthLoginComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        await expect(component).toBeTruthy();
    });

    it('login 正常', async () => {
        await TestBed.configureTestingModule({
            declarations: [
                AuthLoginComponent,
                LoadingComponent
            ],
            providers: [
                { provide: SasakiService, useClass: SasakiServiceStub },
                { provide: Router, useValue: router }
            ]
        })
            .compileComponents();
        const fixture = TestBed.createComponent(AuthLoginComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        await component.login();
        await expect(router.navigate).toHaveBeenCalled();
    });

    it('login エラー', async () => {
        const sasakiService = new SasakiServiceStub();
        spyOn(sasakiService.auth, 'signIn').and.throwError('signInエラー');
        await TestBed.configureTestingModule({
            declarations: [
                AuthLoginComponent,
                LoadingComponent
            ],
            providers: [
                { provide: SasakiService, useValue: sasakiService },
                { provide: Router, useValue: router }
            ]
        })
            .compileComponents();
        const fixture = TestBed.createComponent(AuthLoginComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        await component.login();
        await expect(component.isLoading).toBeFalsy();
    });
});
