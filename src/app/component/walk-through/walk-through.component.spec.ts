/**
 * WalkThroughComponentテスト
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SwiperModule } from 'angular2-useful-swiper';

import { SasakiService, SasakiStubService } from '../../service/sasaki/sasaki-stub.service';
import { LoadingComponent } from '../loading/loading.component';
import { WalkThroughComponent } from './walk-through.component';

describe('WalkThroughComponent', () => {
    let component: WalkThroughComponent;
    let fixture: ComponentFixture<WalkThroughComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                WalkThroughComponent,
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
        fixture = TestBed.createComponent(WalkThroughComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('コンポーネント生成', () => {
        expect(component).toBeTruthy();
    });
});
