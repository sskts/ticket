
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
        image: 'status_03.svg',
        string: 'full'
      },
      {
        symbol: '△',
        image: 'status_02.svg',
        string: 'little'
      },
      {
        symbol: '○',
        image: 'status_01.svg',
        string: 'large'
      }
    ];

    return (value === 0)
      ? availability[0] : (value <= 10)
        ? availability[1] : availability[2];
  }

}
