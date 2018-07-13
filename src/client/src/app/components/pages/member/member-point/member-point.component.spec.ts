import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPointComponent } from './member-point.component';

describe('MemberPointComponent', () => {
  let component: MemberPointComponent;
  let fixture: ComponentFixture<MemberPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
