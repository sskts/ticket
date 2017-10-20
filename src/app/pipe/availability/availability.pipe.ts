
/**
 * AvailabilityPipe
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'availability'
})
export class AvailabilityPipe implements PipeTransform {

  public transform(value: number) {
    const availability = [
      {
        symbol: '×',
        icon: 'icon-vacancy-full-white',
        string: 'vacancy-full'
      },
      {
        symbol: '△',
        icon: 'icon-vacancy-little-white',
        string: 'vacancy-little'
      },
      {
        symbol: '○',
        icon: 'icon-vacancy-large-white',
        string: 'vacancy-large'
      }
    ];

    return (value === 0)
      ? availability[0] : (value <= 10)
        ? availability[1] : availability[2];
  }

}
