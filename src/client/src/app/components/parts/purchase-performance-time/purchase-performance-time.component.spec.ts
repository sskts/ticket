import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasePerformanceTimeComponent } from './purchase-performance-time.component';

describe('PurchasePerformanceTimeComponent', () => {
  let component: PurchasePerformanceTimeComponent;
  let fixture: ComponentFixture<PurchasePerformanceTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasePerformanceTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasePerformanceTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
