/**
 * WalkThroughComponent
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SasakiService } from '../../service/sasaki/sasaki.service';

@Component({
    selector: 'app-walk-through',
    templateUrl: './walk-through.component.html',
    styleUrls: ['./walk-through.component.scss']
})
export class WalkThroughComponent implements OnInit {
    public config: Object;
    public walkThrough: boolean;
    public step: number;
    public isLoading: boolean;

    constructor(
        private sasaki: SasakiService,
        private router: Router
    ) { }

    public ngOnInit() {
        this.isLoading = false;
        this.step = 0;
        this.walkThrough = false;
        this.config = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            spaceBetween: 30
        };
        this.tutorialStart();
    }

    private tutorialStart() {
        const timeout = 3000;
        setTimeout(
            () => {
                this.step = 1;
                this.walkThrough = true;
            },
            timeout);
    }

    public async login() {
        try {
            const result = await this.sasaki.auth.signIn();
            console.log('authorize result:', result);
            this.sasaki.credentials = result;
            this.isLoading = true;
            this.router.navigate(['/']);
        } catch (error) {
            console.error(error);
            this.isLoading = false;
        }
    }

}
