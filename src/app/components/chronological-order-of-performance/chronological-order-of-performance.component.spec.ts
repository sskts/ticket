/**
 * ChronologicalOrderOfPerformanceComponentテスト
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronologicalOrderOfPerformanceComponent } from './chronological-order-of-performance.component';

describe('ChronologicalOrderOfPerformanceComponent', () => {
  let component: ChronologicalOrderOfPerformanceComponent;
  let fixture: ComponentFixture<ChronologicalOrderOfPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChronologicalOrderOfPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChronologicalOrderOfPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
