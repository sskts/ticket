/**
 * ScheduleComponent
 */
import { Component, OnInit } from '@angular/core';
import * as sasaki from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';

import { SasakiService } from '../../../service/sasaki/sasaki.service';

interface Idate {
  value: string;
  text: string;
}

type chronological = sasaki.factory.event.individualScreeningEvent.IEventWithOffer;

interface Ifilm {
  id: string;
  films: sasaki.factory.event.individualScreeningEvent.IEventWithOffer[];
}

/**
 * 販売終了時間 30分前
 */
const END_TIME = 30;

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
/**
 * チケット購入
 * @class ScheduleComponent
 * @implements OnInit
 */
export class ScheduleComponent implements OnInit {
  public isLoading: boolean;
  public theaters: sasaki.factory.place.movieTheater.IPlaceWithoutScreeningRoom[];
  public dateList: Idate[];
  public theater: string;
  public date: string;
  public individualScreeningEvents: sasaki.factory.event.individualScreeningEvent.IEventWithOffer[];
  public chronologicalList: sasaki.factory.event.individualScreeningEvent.IEventWithOffer[];
  public filmList: Ifilm[];
  public config: any;
  public error: string;

  constructor(
    private sasaki: SasakiService
  ) { }

  public async ngOnInit() {
    this.isLoading = true;
    this.config = {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      spaceBetween: 30,
      autoHeight: true
    };
    try {
      this.theaters = await this.sasaki.place.searchMovieTheaters();
      this.theater = this.theaters[0].branchCode;
      this.dateList = this.createDate();
      this.date = this.dateList[0].value;
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
    this.chronologicalList = this.convertToChronologicalOrder(this.individualScreeningEvents);
    this.filmList = this.convertToFilmOrder(this.individualScreeningEvents);
    console.log('時間順', this.chronologicalList);
    console.log('作品順', this.filmList);
    this.isLoading = false;
  }

  /**
   * 時間別へ変換
   * @function getTheaterCode
   * @param {sasaki.factory.event.individualScreeningEvent.IEventWithOffer[]} data
   * @returns {chronological[]}
   */
  private convertToChronologicalOrder(
    data: sasaki.factory.event.individualScreeningEvent.IEventWithOffer[]
  ) {
    const results: chronological[] = [];
    data.forEach((performance) => {
      // 販売可能時間判定
      const limitTime = moment().add(END_TIME, 'minutes');
      if (limitTime.unix() > moment(`${performance.startDate}`).unix()) {
        return;
      }
      results.push(performance);
    });

    return results;
  }
  /**
   * 作品別へ変換
   * @function getTheaterCode
   * @param {sasaki.factory.event.individualScreeningEvent.IEventWithOffer[]} data
   * @returns {Ifilm[]}
   */
  private convertToFilmOrder(
    data: sasaki.factory.event.individualScreeningEvent.IEventWithOffer[]
  ) {
    const results: Ifilm[] = [];
    data.forEach((performance) => {
      // 販売可能時間判定
      const limitTime = moment().add(END_TIME, 'minutes');
      if (limitTime.unix() > moment(`${performance.startDate}`).unix()) {
        return;
      }
      const film = results.find((event) => {
        return (event.id === performance.workPerformed.identifier);
      });
      if (film === undefined) {
        results.push({
          id: performance.workPerformed.identifier,
          films: [performance]
        });
      } else {
        film.films.push(performance);
      }
    });

    return results;
  }
}
