/**
 * FilmOrderOfPerformanceComponentテスト
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmOrderOfPerformanceComponent } from './film-order-of-performance.component';

describe('FilmOrderOfPerformanceComponent', () => {
  let component: FilmOrderOfPerformanceComponent;
  let fixture: ComponentFixture<FilmOrderOfPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmOrderOfPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmOrderOfPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
