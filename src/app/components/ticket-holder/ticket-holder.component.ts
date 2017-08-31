/**
 * TicketHolderComponent
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
  public reservations: any[];

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
      this.reservations = this.convertToReservations();
    } catch (err) {
      console.error(err);
    }

  }

  /**
   * 予約チケットリストへ変換
   * @method convertToReservations
   */
  private convertToReservations() {
    const reservationsIdList = [];
    this.reservationOwnerships.forEach((reservationOwnership) => {
      const reservationsId = reservationOwnership.typeOfGood.reservationFor.identifier;
      if (reservationsIdList.indexOf(reservationsId) === -1) {
        reservationsIdList.push(reservationsId);
      }
    });
    const reservations = reservationsIdList.map((reservationsId) => {
      const reservationOwnerships = this.reservationOwnerships.filter((reservationOwnership) => {
        return (reservationOwnership.typeOfGood.reservationFor.identifier === reservationsId);
      });

      return {
        id: reservationsId,
        reservationFor: reservationOwnerships[0].typeOfGood.reservationFor,
        reservedTickets: reservationOwnerships.map((reservationOwnership) => {
          return reservationOwnership.typeOfGood.reservedTicket;
        })
      };
    });
    console.log('reservations:', reservations);

    return reservations;
  }

}
