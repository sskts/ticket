import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRegisterProgramMembershipComponent } from './auth-register-program-membership.component';

describe('AuthRegisterProgramMembershipComponent', () => {
  let component: AuthRegisterProgramMembershipComponent;
  let fixture: ComponentFixture<AuthRegisterProgramMembershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthRegisterProgramMembershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthRegisterProgramMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
