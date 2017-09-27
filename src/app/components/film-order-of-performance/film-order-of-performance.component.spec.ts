// /**
//  * FilmOrderOfPerformanceComponentテスト
//  */
// import { Pipe, PipeTransform } from '@angular/core';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import * as moment from 'moment';

// import { AvailabilityPipe } from '../../pipe/availability/availability.pipe';
// import { DurationPipe } from '../../pipe/duration/duration.pipe';
// import { TimeFormatPipe } from '../../pipe/time-format/time-format.pipe';
// import { FilmOrderOfPerformanceComponent } from './film-order-of-performance.component';

// describe('FilmOrderOfPerformanceComponent', () => {

//     let component: FilmOrderOfPerformanceComponent;
//     let fixture: ComponentFixture<FilmOrderOfPerformanceComponent>;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [
//                 FilmOrderOfPerformanceComponent,
//                 DurationPipe,
//                 TimeFormatPipe,
//                 AvailabilityPipe
//             ]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(FilmOrderOfPerformanceComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });

//     it('コンポーネント生成', () => {
//         const data: any = {
//             id: '123',
//             films: [
//                 {
//                     startDate: moment().toDate(),
//                     endDate: moment().add(1, 'hours').toDate(),
//                     coaInfo: {
//                         dateJouei: moment().format('YYYYMMDD')
//                     },
//                     workPerformed: {
//                         duration: 'PT1H40M',
//                         identifier: '99315',
//                         name: '通常３Ｄ作品テスト（R15+)'
//                     },
//                     location: {
//                         name: { ja: '' }
//                     },
//                     offer: {
//                         availability: 100
//                     }
//                 }
//             ]
//         };
//         component.data = data;
//         expect(component).toBeTruthy();
//     });

// });
