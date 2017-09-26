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

//     it('should be created', async () => {
//         await TestBed.configureTestingModule({
//             declarations: [
//                 FilmOrderOfPerformanceComponent,
//                 DurationPipe,
//                 TimeFormatPipe,
//                 AvailabilityPipe
//             ]
//         })
//             .compileComponents();
//         const fixture = TestBed.createComponent(FilmOrderOfPerformanceComponent);
//         const component = fixture.componentInstance;
//         const data: any = {
//             id: '',
//             films: [
//                 {
//                     workPerformed: { name: '', duration: 'PT2H16M' },
//                     startDate: moment().add(1, 'hours').toDate(),
//                     endDate: moment().add(2, 'hours').toDate(),
//                     coaInfo: { dateJouei: moment().format('YYYYMMDD') },
//                     location: {
//                         name: { ja: '' },
//                         offer: { availability: '' }
//                     }
//                 }
//             ]
//         };
//         component.data = data;
//         fixture.detectChanges();
//         await expect(component).toBeTruthy();
//     });

//     it('performanceSelect', async () => {
//         await TestBed.configureTestingModule({
//             declarations: [
//                 FilmOrderOfPerformanceComponent,
//                 DurationPipe,
//                 TimeFormatPipe,
//                 AvailabilityPipe
//             ]
//         })
//             .compileComponents();
//         const fixture = TestBed.createComponent(FilmOrderOfPerformanceComponent);
//         const component = fixture.componentInstance;
//         const data: any = {
//             id: '',
//             films: [
//                 {
//                     workPerformed: { name: '', duration: 'PT2H16M' },
//                     startDate: moment().add(1, 'hours').toDate(),
//                     endDate: moment().add(2, 'hours').toDate(),
//                     coaInfo: { dateJouei: moment().format('YYYYMMDD') },
//                     location: {
//                         name: { ja: '' },
//                         offer: { availability: '' }
//                     }
//                 }
//             ]
//         };
//         component.data = data;
//         fixture.detectChanges();
//         spyOn(location, 'href').and.returnValue({});
//         component.performanceSelect(data.films[0]);
//         await expect(component).toBeTruthy();
//         await expect(location.href).toHaveBeenCalled();
//     });
// });
