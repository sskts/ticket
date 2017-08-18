/**
 * チケットホルダーコンポーネント
 */
import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  public ngOnInit() {
    this.config = {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      spaceBetween: 30
    };
  }

}
