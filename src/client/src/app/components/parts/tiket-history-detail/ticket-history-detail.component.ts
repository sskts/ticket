/**
 * TicketDetailComponent
 */
import { AfterContentInit , Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { factory } from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';
// import * as qrcode from 'qrcode';

@Component({
    selector: 'app-ticket-history-detail',
    templateUrl: './ticket-history-detail.component.html',
    styleUrls: ['./ticket-history-detail.component.scss']
})
export class TicketHistoryDetailComponent implements OnInit, AfterContentInit {
    @Input() public reservation: factory.ownershipInfo.IOwnershipInfo<factory.ownershipInfo.IReservationWithDetail<factory.chevre.reservationType>>;
    @ViewChild('main') mainElement: ElementRef;
    @ViewChild('topimage') topImageElement: ElementRef;
    @ViewChild('centerimage') centerImageElement: ElementRef;
    public confirmationNumber: string;
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
        const total = this.reservation.typeOfGood.reservedTicket.totalPrice;
        if (typeof total === 'number') {
            this.totalPrice = total.toLocaleString();
        }
        const startDate = moment(this.reservation.typeOfGood.reservationFor.startDate);
        this.startDate = startDate.format('YYYY.MM.DD(dd)');
        this.startTime = startDate.format('HH:mm');
        this.endTime = moment(this.reservation.typeOfGood.reservationFor.endDate).format('HH:mm');
    }

    public ngAfterContentInit() {
        this.topImageElement.nativeElement.onload = () => {
            this.centerHeight = this.mainElement.nativeElement.offsetHeight - this.topImageElement.nativeElement.offsetHeight;
            this.topHeight = Math.floor(this.topImageElement.nativeElement.offsetHeight);
            if (this.topHeight % 2 == 1) {
                this.topHeight++;
            } 
        };
    }
}
