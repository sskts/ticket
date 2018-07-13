import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRegisterTermsComponent } from './auth-register-terms.component';

describe('AuthRegisterTermsComponent', () => {
  let component: AuthRegisterTermsComponent;
  let fixture: ComponentFixture<AuthRegisterTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthRegisterTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthRegisterTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
