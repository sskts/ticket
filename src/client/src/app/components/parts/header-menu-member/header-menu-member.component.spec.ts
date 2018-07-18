import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuMemberComponent } from './header-menu-member.component';

describe('HeaderMenuMemberComponent', () => {
  let component: HeaderMenuMemberComponent;
  let fixture: ComponentFixture<HeaderMenuMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMenuMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
