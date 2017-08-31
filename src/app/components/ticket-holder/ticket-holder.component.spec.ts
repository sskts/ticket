/**
 * TicketHolderComponentテスト
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketHolderComponent } from './ticket-holder.component';

describe('TicketHolderComponent', () => {
  let component: TicketHolderComponent;
  let fixture: ComponentFixture<TicketHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
