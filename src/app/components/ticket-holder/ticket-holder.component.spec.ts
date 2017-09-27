/**
 * TicketHolderComponentテスト
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MomentModule } from 'angular2-moment';
import { SwiperModule } from 'angular2-useful-swiper';

import { QRCodeModule } from 'angular2-qrcode';
import { TimeFormatPipe } from '../../pipe/time-format/time-format.pipe';
import { SasakiService, SasakiStubService } from '../../service/sasaki/sasaki-stub.service';
import { LoadingComponent } from '../loading/loading.component';
import { NoTicketComponent } from '../no-ticket/no-ticket.component';
import { TicketComponent } from '../ticket/ticket.component';
import { TicketHolderComponent } from './ticket-holder.component';

describe('TicketHolderComponent', () => {
    let component: TicketHolderComponent;
    let fixture: ComponentFixture<TicketHolderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TicketHolderComponent,
                TicketComponent,
                NoTicketComponent,
                LoadingComponent,
                TimeFormatPipe
            ],
            imports: [
                SwiperModule,
                MomentModule,
                QRCodeModule
            ],
            providers: [
                { provide: SasakiService, useClass: SasakiStubService }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TicketHolderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('コンポーネント生成', () => {
        expect(component).toBeTruthy();
    });
});
