import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasePerformanceComponent } from './purchase-performance.component';

describe('PurchasePerformanceComponent', () => {
  let component: PurchasePerformanceComponent;
  let fixture: ComponentFixture<PurchasePerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasePerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasePerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
