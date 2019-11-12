import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent, SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { CallNativeService, CampaignService, InAppBrowserTarget } from '../../../../../services';

@Component({
    selector: 'app-campaign',
    templateUrl: './campaign.component.html',
    styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {
    @Input() public url: string;
    public data: {
        index: number;
        title: string;
        from: Date;
        through: Date;
        image: string;
        url: string;
        place: string[];
    }[] = [];
    public swiperConfig: SwiperConfigInterface;
    @ViewChild(SwiperComponent, { static: false }) public componentRef: SwiperComponent;
    @ViewChild(SwiperDirective, { static: true }) public directiveRef: SwiperDirective;

    constructor(
        private campaignService: CampaignService,
        private callNativeService: CallNativeService
    ) { }

    public async ngOnInit() {
        try {
            this.data = await this.campaignService.getAvailabilityData(this.url);
            this.swiperConfig = {
                loop: true,
                effect: (this.data.length > 1) ? 'slide' : 'fade',
                navigation: {
                    nextEl: '.schedule-slider .swiper-button-next',
                    prevEl: '.schedule-slider .swiper-button-prev',
                },
            };
            this.directiveRef.update();
        } catch (error) {
            console.error(error);
        }
    }

    public openBlowser(url: string) {
        this.callNativeService.inAppBrowser({ url, target: InAppBrowserTarget.System });
    }

    /**
     * リサイズ
     */
    public resize() {
        this.directiveRef.update();
    }
}
