import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRegisterPaymentComponent } from './auth-register-payment.component';

describe('AuthRegisterPaymentComponent', () => {
  let component: AuthRegisterPaymentComponent;
  let fixture: ComponentFixture<AuthRegisterPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthRegisterPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthRegisterPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
