/**
 * TicketHolderComponentテスト
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MomentModule } from 'angular2-moment';
import { SwiperModule } from 'angular2-useful-swiper';

import { QRCodeModule } from 'angular2-qrcode';
import { TimeFormatPipe } from '../../../pipe/time-format/time-format.pipe';
import { AwsCognitoService } from '../../../service/aws-cognito/aws-cognito.service';
import { LoadingComponent } from '../../loading/loading.component';
import { NoTicketComponent } from '../no-ticket/no-ticket.component';
import { TicketComponent } from '../ticket/ticket.component';
import { TicketHolderComponent } from './ticket-holder.component';

describe('TicketHolderComponent', () => {

    it('コンポーネント生成', async () => {
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
                { provide: AwsCognitoService, useValue: awsCognitoServiceStub }
            ]
        }).compileComponents();
        const fixture = TestBed.createComponent(TicketHolderComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
