import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointStampsComponent } from './point-stamps.component';

describe('PointStampsComponent', () => {
  let component: PointStampsComponent;
  let fixture: ComponentFixture<PointStampsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointStampsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointStampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
