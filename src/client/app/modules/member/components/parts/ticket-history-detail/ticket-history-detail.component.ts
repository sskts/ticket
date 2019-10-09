/**
 * TicketDetailComponent
 */
import { AfterContentChecked , Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { factory } from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';
import { SasakiService } from '../../../../../services';

@Component({
    selector: 'app-ticket-history-detail',
    templateUrl: './ticket-history-detail.component.html',
    styleUrls: ['./ticket-history-detail.component.scss']
})
export class TicketHistoryDetailComponent implements OnInit, AfterContentChecked {
    @Input() public reservation: factory.ownershipInfo.IOwnershipInfo<
        factory.chevre.reservation.IReservation<
            factory.chevre.reservationType.EventReservation>>;
    @ViewChild('topimage', { static: true }) private topImageElement: ElementRef;
    public confirmationNumber: string;
    public totalPrice: string;
    public startDate: string;
    public startTime: string;
    public endTime: string;
    public centerHeight: number;
    public topHeight: number;
    public theaterName: string;

    constructor(
        private sasaki: SasakiService
    ) {}

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
    private async getTheaterName(code: string) {
        await this.sasaki.getServices();
        const result = await this.sasaki.seller.search({
            typeOfs: [factory.organizationType.MovieTheater],
            location: { branchCodes: [code] }
        });
        if (result.data.length > 0) {
            return result.data[0].name.ja;
        }
        return '';
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
