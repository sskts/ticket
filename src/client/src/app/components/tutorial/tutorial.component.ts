/**
 * TutorialComponent
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaveType, StorageService } from '../../services/storage/storage.service';

@Component({
    selector: 'app-tutorial',
    templateUrl: './tutorial.component.html',
    styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {
    public config: SwiperOptions;
    public step: number;

    constructor(
        private storage: StorageService,
        private router: Router
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
        window.scrollTo(0, 0);
        this.step = 0;
        this.config = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            spaceBetween: 30,
            onSlideChangeEnd: (swiper) => {
                this.step = swiper.activeIndex;
            }
        };
    }

    /**
     * はじめる
     * @method start
     */
    public start() {
        const device = {
            tutorial: true
        };
        this.storage.save('device', device, SaveType.Local);
        this.router.navigate(['/auth/select']);
    }
}
