/**
 * WalkThroughComponent
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AwsCognitoService } from '../../service/aws-cognito/aws-cognito.service';
import { StorageService } from '../../service/storage/storage.service';

@Component({
    selector: 'app-walk-through',
    templateUrl: './walk-through.component.html',
    styleUrls: ['./walk-through.component.scss']
})
export class WalkThroughComponent implements OnInit {
    public config: SwiperOptions;
    public step: number;
    public isLoading: boolean;

    constructor(
        private router: Router,
        private awsCognito: AwsCognitoService,
        private storage: StorageService
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     * @returns {Promise<void>}
     */
    public ngOnInit(): void {
        this.isLoading = false;
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
     * スタート
     * @method start
     * @returns {Promise<void>}
     */
    public async start() {
        try {
            this.isLoading = true;
            await this.awsCognito.authenticateWithTerminal();
            await this.storage.save('info', {
                version: environment.version
            });
            await this.router.navigate(['/']);
        } catch (error) {
            console.error(error);
        }
        this.isLoading = false;
    }

}
