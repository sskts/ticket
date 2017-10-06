/**
 * SignOutComponentテスト
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { SasakiService, SasakiStubService } from '../../service/sasaki/sasaki-stub.service';
import { Router, RouterStub } from '../../testing/router-stubs';
import { SignOutComponent } from './sign-out.component';

describe('SignOutComponent', () => {

    it('コンポーネント生成', async () => {
        await TestBed.configureTestingModule({
            declarations: [
                SignOutComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                { provide: SasakiService, useClass: SasakiStubService }
            ]
        })
            .compileComponents();
        const fixture = TestBed.createComponent(SignOutComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        await expect(component).toBeTruthy();
    });

    it('logout 正常', async () => {
        const routerStub = new RouterStub();
        routerStub.navigate = jasmine.createSpy('navigate');
        await TestBed.configureTestingModule({
            declarations: [
                SignOutComponent
            ],
            providers: [
                { provide: SasakiService, useClass: SasakiStubService },
                { provide: Router, useValue: routerStub }
            ]
        })
            .compileComponents();
        const fixture = TestBed.createComponent(SignOutComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        await component.logout();
        await expect(routerStub.navigate).toHaveBeenCalled();
    });
});
