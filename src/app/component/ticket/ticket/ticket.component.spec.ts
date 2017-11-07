/**
 * TicketComponentテスト
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MomentModule } from 'angular2-moment';
import { QRCodeModule } from 'angular2-qrcode';
import * as moment from 'moment';
import { TimeFormatPipe } from '../../../pipe/time-format/time-format.pipe';
import { TicketComponent } from './ticket.component';

describe('TicketComponent', () => {
    let component: TicketComponent;
    let fixture: ComponentFixture<TicketComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TicketComponent,
                TimeFormatPipe
            ],
            imports: [
                MomentModule,
                QRCodeModule
            ]
        })
            .compileComponents();
    }));

    it('コンポーネント生成', () => {
        fixture = TestBed.createComponent(TicketComponent);
        component = fixture.componentInstance;
        const reservation: any = {
            confirmationNumber: '12345678',
            acceptedOffers: [
                {
                    itemOffered: {
                        reservedTicket: {
                            ticketedSeat: { seatNumber: 'A-1' },
                            coaTicketInfo: { ticketName: 'TEST' },
                            ticketToken: '12345678'
                        },
                        reservationFor: {
                            workPerformed: { name: 'TEST' },
                            coaInfo: {  dateJouei: moment().format('YYYYMMDD') },
                            startDate: moment().toDate(),
                            endDate: moment().add(1, 'hour').toDate(),
                            superEvent: {
                                location: {
                                    name: { ja: 'TEST' }
                                }
                            },
                            location: {
                                name: { ja: 'TEST' }
                            }
                        }
                    }
                }
            ]
        };
        component.reservation = reservation;
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
