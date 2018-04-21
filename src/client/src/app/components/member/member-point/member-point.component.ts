import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-member-point',
    templateUrl: './member-point.component.html',
    styleUrls: ['./member-point.component.scss']
})
export class MemberPointComponent implements OnInit {
    public isLoading: boolean;
    public config: SwiperOptions;
    public pointUseModal: boolean;

    constructor() { }

    public ngOnInit() {
        this.isLoading = false;
        this.pointUseModal = false;
        this.config = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoHeight: true
        };
    }

}
