import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRegisterCreditComponent } from './auth-register-credit.component';

describe('AuthRegisterCreditComponent', () => {
  let component: AuthRegisterCreditComponent;
  let fixture: ComponentFixture<AuthRegisterCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthRegisterCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthRegisterCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
