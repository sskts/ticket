/**
 * TicketDetailComponent
 */
import {
    AfterContentChecked,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { factory } from '@cinerino/sdk';
import * as moment from 'moment';

@Component({
    selector: 'app-ticket-history-detail',
    templateUrl: './ticket-history-detail.component.html',
    styleUrls: ['./ticket-history-detail.component.scss'],
})
export class TicketHistoryDetailComponent
    implements OnInit, AfterContentChecked
{
    @Input() public reservation: {
        data: factory.ownershipInfo.IOwnershipInfo<
            factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>
        >;
        theaterName: string;
    };
    @ViewChild('topimage', { static: true })
    private topImageElement: ElementRef;
    public totalPrice: string;
    public startDate: string;
    public startTime: string;
    public endTime: string;
    public centerHeight: number;
    public topHeight: number;

    constructor() {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        this.centerHeight = 0;
        this.topHeight = 0;
        this.totalPrice = '';
        const total =
            this.reservation.data.typeOfGood.reservedTicket.coaTicketInfo ===
            undefined
                ? undefined
                : this.reservation.data.typeOfGood.reservedTicket.coaTicketInfo
                      .salePrice;

        if (typeof total === 'number') {
            this.totalPrice = total.toLocaleString();
        }
        const startDate = moment(
            this.reservation.data.typeOfGood.reservationFor.startDate
        );
        this.startDate = startDate.format('YYYY.MM.DD(dd)');
        this.startTime = startDate.format('HH:mm');
        if (
            this.reservation.data.typeOfGood.reservationFor.endDate !==
            undefined
        ) {
            this.endTime = moment(
                this.reservation.data.typeOfGood.reservationFor.endDate
            ).format('HH:mm');
        }
    }

    public ngAfterContentChecked() {
        if (this.reservation.theaterName !== '') {
            this.topHeight = Math.floor(
                this.topImageElement.nativeElement.offsetHeight
            );
            if (this.topHeight % 2 === 1) {
                this.topHeight++;
            }
        }
    }
}
