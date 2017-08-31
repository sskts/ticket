/**
 * TicketComponent
 */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
/**
 * チケット
 * @class TicketComponent
 * @implements OnInit
 */
export class TicketComponent implements OnInit {
  @Input() public reservation: {};

  constructor() { }

  public ngOnInit(): void {
  }

}
