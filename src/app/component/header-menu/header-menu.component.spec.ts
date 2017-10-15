/**
 * HeaderMenuComponentテスト
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserService, UserStubService } from '../../service/user/user-stub.service';
import { HeaderMenuComponent } from './header-menu.component';

describe('HeaderMenuComponent', () => {
    let component: HeaderMenuComponent;
    let fixture: ComponentFixture<HeaderMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HeaderMenuComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                { provide: UserService, useClass: UserStubService }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('コンポーネント生成 isOpen = false', () => {
        component.isOpen = false;
        expect(component).toBeTruthy();
    });

    it('コンポーネント生成 isOpen = true', () => {
        component.isOpen = true;
        expect(component).toBeTruthy();
    });
});
