/**
 * HeaderComponentテスト
 */
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SasakiService, SasakiStubService } from '../../service/sasaki/sasaki-stub.service';
import { UserService, UserStubService } from '../../service/user/user-stub.service';
import { HeaderMenuComponent } from '../header-menu/header-menu.component';
import { LogoutComponent } from '../logout/logout.component';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {

    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HeaderComponent,
                HeaderMenuComponent,
                LogoutComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                { provide: UserService, useClass: UserStubService },
                { provide: SasakiService, useClass: SasakiStubService }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('コンポーネント生成', () => {
        expect(component).toBeTruthy();
    });

    it('menuOpen', () => {
        component.menuOpen();
        expect(component.isMenuOpen).toBeTruthy();
    });

    it('menuClose', () => {
        component.menuClose();
        expect(component.isMenuOpen).toBeFalsy();
    });

    it('logoutModalOpen', () => {
        component.logoutModalOpen();
        expect(component.isMenuOpen).toBeFalsy();
        expect(component.isLogoutModalOpen).toBeTruthy();
    });

    it('logoutModalClose', () => {
        component.logoutModalClose();
        expect(component.isLogoutModalOpen).toBeFalsy();
    });

});
