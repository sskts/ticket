/**
 * チケットコンポーネント
 */
import { Component, OnInit, Input } from '@angular/core';

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
  @Input() public reservationOwnership: any;
  public reservationFor: any;
  
  constructor() { }

  public ngOnInit() {
    this.reservationFor = this.reservationOwnership.typeOfGood.reservationFor;
  }

}
