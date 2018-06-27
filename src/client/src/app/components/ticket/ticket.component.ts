/**
 * TicketComponent
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SwiperComponent, SwiperConfigInterface, SwiperDirective, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { IReservation, ReservationService } from '../../services/reservation/reservation.service';
import { UserService } from '../../services/user/user.service';

@Component({
    selector: 'app-ticket',
    templateUrl: './ticket.component.html',
    styleUrls: ['./ticket.component.scss']
})
/**
 * チケットホルダー
 * @class TicketComponent
 * @implements OnInit
 */
export class TicketComponent implements OnInit {
    @ViewChild(SwiperComponent) public componentRef?: SwiperComponent;
    @ViewChild(SwiperDirective) public directiveRef?: SwiperDirective;
    public config: SwiperConfigInterface;
    public isLoading: boolean;
    public reservations: IReservation[];

    constructor(
        private router: Router,
        private reservation: ReservationService,
        public user: UserService
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        window.scrollTo(0, 0);
        this.isLoading = true;
        this.reservations = [];
        const pagination: SwiperPaginationInterface = {
            el: '.swiper-pagination',
            clickable: true
        };
        this.config = {
            pagination: pagination,
            autoHeight: true
        };
        this.reservation.isMember = this.user.isMember();
        try {
            this.reservations = await this.reservation.getReservationByAppreciationDayOrder();
        } catch (err) {
            this.router.navigate(['/error', { redirect: '/ticket' }]);
            console.log(err);
        }

        this.isLoading = false;
    }

    /**
     * スライド
     */
    public slideChangeTransitionEnd() {
        if (this.directiveRef === undefined) {
            return;
        }
        this.directiveRef.update();
        // console.log(this.componentRef, this.directiveRef);
        // const contents = (<HTMLElement>document.querySelector('.contents'));
        // contents.style.overflowY = 'hidden';
        // this.config.autoHeight = false;
        // setTimeout(() => {
        //     contents.style.overflowY = 'auto';
        // }, 100);
    }

}
