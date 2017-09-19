/**
 * FilmOrderOfPerformanceComponent
 */
import { Component, Input, OnInit } from '@angular/core';
import * as sasaki from '@motionpicture/sskts-api-javascript-client';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-film-order-of-performance',
  templateUrl: './film-order-of-performance.component.html',
  styleUrls: ['./film-order-of-performance.component.scss']
})
export class FilmOrderOfPerformanceComponent implements OnInit {
  @Input() public data: {
    id: string;
    films: sasaki.factory.event.individualScreeningEvent.IEventWithOffer[];
  };
  public filmInfo: sasaki.factory.event.individualScreeningEvent.IEventWithOffer;

  constructor() { }

  public ngOnInit() {
    this.filmInfo = this.data.films[0];
  }

  public performanceSelect(data: sasaki.factory.event.individualScreeningEvent.IEventWithOffer) {
    location.href = `${environment.ticketingSite}/signIn?id=${data.identifier}`;
  }

}
