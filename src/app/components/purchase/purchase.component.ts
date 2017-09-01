/**
 * PurchaseComponent
 */
import { Component, OnInit } from '@angular/core';
import * as sasaki from '@motionpicture/sasaki-api';
import * as moment from 'moment';

import { SasakiService } from '../../service/sasaki/sasaki.service';

interface Idate {
  value: string;
  text: string;
}

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
/**
 * チケット購入
 * @class PurchaseComponent
 * @implements OnInit
 */
export class PurchaseComponent implements OnInit {
  public isLoading: boolean;
  public theaters: sasaki.factory.place.movieTheater.IPlaceWithoutScreeningRoom[];
  public dateList: Idate[];
  public theater: string;
  public date: string;
  public individualScreeningEvents: sasaki.factory.event.individualScreeningEvent.IEventWithOffer[];

  constructor(
    private sasaki: SasakiService
  ) { }

  public async ngOnInit() {
    this.isLoading = false;
    this.theater = '';
    this.date = '';
    try {
      this.theaters = await this.sasaki.place.searchMovieTheaters();
      this.dateList = this.createDate();
      await this.fitchPerformances();
    } catch (err) {
      console.log(err);
    }
  }

  private createDate(): Idate[] {
    const limit = 3;
    const results: Idate[] = [];
    for (let i = 0; i < limit; i += 1) {
      const date = moment().add(i, 'day');
      results.push({
        value: date.format('YYYYMMDD'),
        text: (i === 0) ? '本日'
          : (i === 1) ? '明日'
            : (i === 2) ? '明後日'
              : date.format('YYYY年MM月DD日')
      });
    }

    return results;
  }

  public async changeConditions() {
    try {
      await this.fitchPerformances();
    } catch (err) {
      console.log(err);
    }
  }

  private async fitchPerformances() {
    if (this.theater === '') {
      throw new Error('theater is required');
    }
    if (this.date === '') {
      throw new Error('date  is required');
    }
    this.isLoading = true;
    this.individualScreeningEvents = await this.sasaki.events.searchIndividualScreeningEvent({
      theater: this.theater,
      day: this.date
    });
    console.log('上映イベント検索', this.individualScreeningEvents);
    this.isLoading = false;
  }
}
