/**
 * FilmOrderOfPerformanceComponentテスト
 */
import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmOrderOfPerformanceComponent } from './film-order-of-performance.component';

// tslint:disable-next-line:no-stateless-class component-selector
@Pipe({ name: 'duration' })
class DurationPipe implements PipeTransform {
  public transform(value: any, format: string): number {
    return 0;
  }
}
// tslint:disable-next-line:no-stateless-class component-selector
@Pipe({ name: 'availability' })
class AvailabilityPipe implements PipeTransform {
  public transform(value: number) {
    return { string: '' };
  }
}
// tslint:disable-next-line:no-stateless-class component-selector
@Pipe({ name: 'timeFormat' })
class TimeFormatPipe implements PipeTransform {
  public transform(screeningTime: Date, referenceDate: string): string {
    return '00:00';
  }
}

describe('FilmOrderOfPerformanceComponent', () => {
  let component: FilmOrderOfPerformanceComponent;
  let fixture: ComponentFixture<FilmOrderOfPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FilmOrderOfPerformanceComponent,
        DurationPipe,
        TimeFormatPipe,
        AvailabilityPipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmOrderOfPerformanceComponent);
    component = fixture.componentInstance;
    const data: any = {
      id: '',
      films: [
        {
          workPerformed: { name: '', duration: '' },
          startDate: new Date(),
          endDate: new Date(),
          coaInfo: { dateJouei: '' },
          location: {
            name: { ja: '' },
            offer: { availability: '' }
          }
        }
      ]
    };
    component.data = data;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
