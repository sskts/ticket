import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPointHistoryComponent } from './member-point-history.component';

describe('MemberPointHistoryComponent', () => {
  let component: MemberPointHistoryComponent;
  let fixture: ComponentFixture<MemberPointHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberPointHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPointHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
