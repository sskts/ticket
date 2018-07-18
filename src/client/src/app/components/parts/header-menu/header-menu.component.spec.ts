/**
 * MenuComponentテスト
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CallNativeService } from '../../../services/call-native/call-native.service';
import { HeaderMenuComponent } from './header-menu.component';

describe('MenuComponent', () => {
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
                CallNativeService
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
