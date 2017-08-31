import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  /**
   * 時間変換
   * @method transform
   * @param {Date} screeningTime
   * @param {string} referenceDate
   */
  public transform(screeningTime: Date, referenceDate: string): any {
    const HOUR = 60;
    const DIGITS = -2;
    const diff = moment(screeningTime).diff(moment(referenceDate), 'minutes');
    const hour = (`00${Math.floor(diff / HOUR)}`).slice(DIGITS);
    const minutes = moment(screeningTime).format('mm');

    return `${hour}:${minutes}`;
  }

}
