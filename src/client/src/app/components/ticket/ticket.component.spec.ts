/**
 * TicketComponentテスト
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MomentModule } from 'angular2-moment';
import { SwiperModule } from 'angular2-useful-swiper';
import { TimeFormatPipe } from '../../pipes/time-format/time-format.pipe';
import { ReservationService } from '../../services/reservation/reservation.service';
import { LoadingComponent } from '../parts/loading/loading.component';
import { TicketNotFoundComponent } from '../parts/ticket-not-found/ticket-not-found.component';
import { TicketDetailComponent } from '../parts/ticket-detail/ticket-detail.component';
import { TicketComponent } from './ticket.component';

describe('TicketHolderComponent', () => {

    it('コンポーネント生成', async () => {
        const reservationServiceStub = {
            getReservation: () => {
                return Promise.resolve();
            },
            getReservationByPurchaseNumberOrder: () => {
                return [];
            }
        };
        await TestBed.configureTestingModule({
            declarations: [
                TicketComponent,
                TicketDetailComponent,
                TicketNotFoundComponent,
                LoadingComponent,
                TimeFormatPipe
            ],
            imports: [
                RouterTestingModule.withRoutes([]),
                SwiperModule,
                MomentModule
            ],
            providers: [
                { provide: ReservationService, useValue: reservationServiceStub }
            ]
        }).compileComponents();
        const fixture = TestBed.createComponent(TicketComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        await component.ngOnInit();
        expect(component.isLoading).toBeFalsy();
    });
});
