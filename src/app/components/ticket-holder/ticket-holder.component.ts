/**
 * チケットホルダーコンポーネント
 */
import { Component, OnInit } from '@angular/core';

import { SasakiService } from '../../service/sasaki/sasaki.service';

@Component({
  selector: 'app-ticket-holder',
  templateUrl: './ticket-holder.component.html',
  styleUrls: ['./ticket-holder.component.scss']
})
/**
 * チケットホルダー
 * @class TicketHolderComponent
 * @implements OnInit
 */
export class TicketHolderComponent implements OnInit {
  public config: Object;
  public reservationOwnerships: any[];

  constructor(
    private sasaki: SasakiService
  ) { }

  public async ngOnInit() {
    this.config = {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      spaceBetween: 30
    };
    try {
      this.reservationOwnerships = await this.sasaki.people.searchReservationOwnerships({
        personId: 'me'
      });
      console.log('reservationOwnerships:', this.reservationOwnerships);
    } catch (err) {
      console.error(err);
    }

  }

}
