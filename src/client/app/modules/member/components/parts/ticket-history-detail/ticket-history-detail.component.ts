/**
 * TicketDetailComponent
 */
import { AfterContentChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { factory } from '@cinerino/sdk';
import * as moment from 'moment';
import { CinerinoService } from '../../../../../services';

@Component({
    selector: 'app-ticket-history-detail',
    templateUrl: './ticket-history-detail.component.html',
    styleUrls: ['./ticket-history-detail.component.scss']
})
export class TicketHistoryDetailComponent implements OnInit, AfterContentChecked {
    @Input() public reservation: factory.ownershipInfo.IOwnershipInfo<
        factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>
    >;
    @ViewChild('topimage', { static: true }) private topImageElement: ElementRef;
    public totalPrice: string;
    public startDate: string;
    public startTime: string;
    public endTime: string;
    public centerHeight: number;
    public topHeight: number;
    public theaterName: string;

    constructor(
        private cinerino: CinerinoService
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        this.centerHeight = 0;
        this.topHeight = 0;
        this.totalPrice = '';
        const total = this.reservation.typeOfGood.reservedTicket.coaTicketInfo === undefined ? undefined :
            this.reservation.typeOfGood.reservedTicket.coaTicketInfo.salePrice;

        if (typeof total === 'number') {
            this.totalPrice = total.toLocaleString();
        }
        const startDate = moment(this.reservation.typeOfGood.reservationFor.startDate);
        this.startDate = startDate.format('YYYY.MM.DD(dd)');
        this.startTime = startDate.format('HH:mm');
        if (this.reservation.typeOfGood.reservationFor.endDate !== undefined) {
            this.endTime = moment(this.reservation.typeOfGood.reservationFor.endDate).format('HH:mm');
        }
        if (this.reservation.typeOfGood.reservationFor.coaInfo !== undefined &&
            typeof this.reservation.typeOfGood.reservationFor.coaInfo.theaterCode === 'string') {
            this.theaterName = await this.getTheaterName(this.reservation.typeOfGood.reservationFor.coaInfo.theaterCode);
        }
    }
    /**
     * 劇場一覧取得
     */
    private async getTheaterName(branchCode: string) {
        await this.cinerino.getServices();
        const result = await this.cinerino.seller.search({
            branchCode: { $eq: branchCode }
        });
        const seller = result.data[0];
        return (seller.name === undefined) ? ''
            : (typeof seller.name === 'string') ? seller.name
                : (seller.name.ja === undefined) ? ''
                    : seller.name.ja;
    }

    public ngAfterContentChecked() {
        if (this.theaterName !== '') {
            this.topHeight = Math.floor(this.topImageElement.nativeElement.offsetHeight);
            if (this.topHeight % 2 === 1) {
                this.topHeight++;
            }
        }
    }
}
