/**
 * FilmScheduleComponentテスト
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmScheduleComponent } from './film-schedule.component';

describe('FilmScheduleComponent', () => {
  let component: FilmScheduleComponent;
  let fixture: ComponentFixture<FilmScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
