/**
 * TicketComponent
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SwiperComponent, SwiperConfigInterface, SwiperDirective, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { IReservation, ReservationService, UserService } from '../../../../services';


@Component({
    selector: 'app-ticket',
    templateUrl: './ticket-index.component.html',
    styleUrls: ['./ticket-index.component.scss']
})
/**
 * チケットホルダー
 * @class TicketIndexComponent
 * @implements OnInit
 */
export class TicketIndexComponent implements OnInit {
    @ViewChild(SwiperComponent, { static: false }) public componentRef: SwiperComponent;
    @ViewChild(SwiperDirective, { static: true }) public directiveRef: SwiperDirective;
    public config: SwiperConfigInterface;
    public isLoading: boolean;
    public reservations: IReservation[];
    public touch: boolean;

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
        this.touch = true;
        this.isLoading = true;
        this.reservations = [];
        const pagination: SwiperPaginationInterface = {
            el: '.swiper-pagination',
            clickable: true
        };
        this.config = {
            pagination: pagination,
        };
        this.reservation.isMember = this.user.isMember();
        try {
            if (this.user.isMember()) {
                // 会員
                await this.user.updateAccount();
            }
            this.reservations = await this.reservation.getReservationByAppreciationDayOrder();
        } catch (err) {
            this.router.navigate(['/error', { redirect: '/ticket' }]);
            console.log(err);
        }

        this.isLoading = false;
    }

    public slideChangeTransitionStart() {
        // console.log('slideChangeTransitionStart');
        this.touch = false;
    }

    public slideChangeTransitionEnd() {
        // console.log('slideChangeTransitionEnd');
        this.touch = true;
    }

}
