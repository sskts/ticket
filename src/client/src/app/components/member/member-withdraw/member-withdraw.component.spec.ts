import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberWithdrawComponent } from './member-withdraw.component';

describe('MemberWithdrawComponent', () => {
  let component: MemberWithdrawComponent;
  let fixture: ComponentFixture<MemberWithdrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberWithdrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
