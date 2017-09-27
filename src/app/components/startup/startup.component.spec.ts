/**
 * StartupComponentテスト
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SwiperModule } from 'angular2-useful-swiper';

import { SasakiService, SasakiStubService } from '../../service/sasaki/sasaki-stub.service';
import { LoadingComponent } from '../loading/loading.component';
import { StartupComponent } from './startup.component';

describe('StartupComponent', () => {
    let component: StartupComponent;
    let fixture: ComponentFixture<StartupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                StartupComponent,
                LoadingComponent
            ],
            providers: [
                { provide: SasakiService, useClass: SasakiStubService }
            ],
            imports: [
                SwiperModule,
                RouterTestingModule.withRoutes([])
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StartupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('コンポーネント生成', () => {
        expect(component).toBeTruthy();
    });
});
