// /**
//  * TicketComponentテスト
//  */
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { MomentModule } from 'angular2-moment';
// import { QRCodeModule } from 'angular2-qrcode';

// import { TimeFormatPipe } from '../../pipe/time-format/time-format.pipe';
// import { TicketComponent } from './ticket.component';

// describe('TicketComponent', () => {
//     let component: TicketComponent;
//     let fixture: ComponentFixture<TicketComponent>;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [
//                 TicketComponent,
//                 TimeFormatPipe
//             ],
//             imports: [
//                 MomentModule,
//                 QRCodeModule
//             ]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(TicketComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });

//     it('コンポーネント生成', () => {
//         expect(component).toBeTruthy();
//     });
// });
