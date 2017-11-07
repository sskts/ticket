/**
 * ScheduleComponentテスト
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Jsonp } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SwiperModule } from 'angular2-useful-swiper';
import { Observable } from 'rxjs/Observable';
import { AvailabilityPipe } from '../../../pipe/availability/availability.pipe';
import { DurationPipe } from '../../../pipe/duration/duration.pipe';
import { TimeFormatPipe } from '../../../pipe/time-format/time-format.pipe';
import { AwsCognitoService } from '../../../service/aws-cognito/aws-cognito.service';
import { PurchaseService } from '../../../service/purchase/purchase.service';
import { LoadingComponent } from '../../loading/loading.component';
import { FilmOrderPerformanceComponent } from '../film-order-performance/film-order-performance.component';
import { FilmOrderComponent } from '../film-order/film-order.component';
import { ScheduleComponent } from './schedule.component';

describe('ScheduleComponent', () => {

    it('コンポーネント生成', async () => {
        const jsonpStub = {
            get: () => {
                return new Observable();
            }
        };
        const purchaseServiceStub = {
            getMovieTheaters: () => {
                return Promise.resolve([
                    {
                        location: { branchCode: '123' },
                        name: { ja: 'TEST' }
                    }
                ]);
            }
        };
        const awsCognitoServiceStub = {
            getRecords: () => {
                return Promise.resolve({});
            },
            updateRecords: () => {
                return Promise.resolve();
            }
        };
        await TestBed.configureTestingModule({
            declarations: [
                ScheduleComponent,
                FilmOrderComponent,
                FilmOrderPerformanceComponent,
                LoadingComponent,
                DurationPipe,
                TimeFormatPipe,
                AvailabilityPipe
            ],
            imports: [
                RouterTestingModule.withRoutes([]),
                ReactiveFormsModule,
                FormsModule,
                SwiperModule
            ],
            providers: [
                { provide: Jsonp, useValue: jsonpStub },
                { provide: PurchaseService, useValue: purchaseServiceStub },
                { provide: AwsCognitoService, useValue: awsCognitoServiceStub }
            ]
        }).compileComponents();
        const fixture = TestBed.createComponent(ScheduleComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        await component.ngOnInit();
        expect(component.isLoading).toBeFalsy();
    });
});
