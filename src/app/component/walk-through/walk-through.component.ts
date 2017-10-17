/**
 * WalkThroughComponent
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AwsCognitoService } from '../../service/aws-cognito/aws-cognito.service';

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
        private awsCognito: AwsCognitoService
    ) { }

    public ngOnInit() {
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

    public async signIn() {
        try {
            this.isLoading = true;
            await this.awsCognito.authenticateWithTerminal();
            await this.awsCognito.updateRecords('user', {
                updateAt: moment().toISOString()
            });
            await this.router.navigate(['/']);
        } catch (error) {
            console.error(error);
        }
        this.isLoading = false;
    }

}
