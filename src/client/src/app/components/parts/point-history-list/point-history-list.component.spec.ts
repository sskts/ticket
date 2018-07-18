import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointHistoryListComponent } from './point-history-list.component';

describe('PointHistoryListComponent', () => {
  let component: PointHistoryListComponent;
  let fixture: ComponentFixture<PointHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
