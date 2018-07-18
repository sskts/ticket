import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSelectComponent } from './auth-select.component';

describe('AuthSelectComponent', () => {
  let component: AuthSelectComponent;
  let fixture: ComponentFixture<AuthSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
