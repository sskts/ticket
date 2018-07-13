import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberEditCreditComponent } from './member-edit-credit.component';

describe('MemberEditCreditComponent', () => {
  let component: MemberEditCreditComponent;
  let fixture: ComponentFixture<MemberEditCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberEditCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberEditCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
