
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
      { string: '×' },
      { string: '△' },
      { string: '○' }
    ];

    return (value === 0) ? availability[0]
      : (value <= 10) ? availability[1] : availability[2];
  }

}
