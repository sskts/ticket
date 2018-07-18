import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuNotMemberComponent } from './header-menu-not-member.component';

describe('HeaderMenuNotMemberComponent', () => {
  let component: HeaderMenuNotMemberComponent;
  let fixture: ComponentFixture<HeaderMenuNotMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMenuNotMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuNotMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
