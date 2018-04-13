import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasePerformanceFilmComponent } from './purchase-performance-film.component';

describe('PurchasePerformanceFilmComponent', () => {
  let component: PurchasePerformanceFilmComponent;
  let fixture: ComponentFixture<PurchasePerformanceFilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasePerformanceFilmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasePerformanceFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
