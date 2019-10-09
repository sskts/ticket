
/**
 * AvailabilityPipe
 */
import { Pipe, PipeTransform } from '@angular/core';

export interface IAvailability {
    symbolText: string;
    icon: string;
    className: string;
}

@Pipe({
    name: 'availability'
})
export class AvailabilityPipe implements PipeTransform {

    /**
     * 変換
     * @method transform
     * @param {number} value
     */
    public transform(value: number): IAvailability {
        const availability = [
            {
                symbolText: '×',
                icon: 'vacancy-full-white',
                className: 'vacancy-full',
                text: '満席'
            },
            {
                symbolText: '△',
                icon: 'vacancy-little-white',
                className: 'vacancy-little',
                text: '購入'
            },
            {
                symbolText: '○',
                icon: 'vacancy-large-white',
                className: 'vacancy-large',
                text: '購入'
            }
        ];

        return (value === 0)
            ? availability[0] : (value <= 10)
                ? availability[1] : availability[2];
    }

}
