import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-ticket-not-found',
    templateUrl: './ticket-not-found.component.html',
    styleUrls: ['./ticket-not-found.component.scss'],
})
export class TicketNotFoundComponent implements OnInit, OnDestroy {
    @Input() public text: string;
    public interval: any;
    public top?: number;
    constructor() {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
        const el = document.querySelector('app-campaign');
        const el2 = document.querySelector('#closeText');
        if (el === null && el2 === null) {
            this.top = 0;
            return;
        }
        let count = 0;
        const limit = 10;
        const intervalTime = 500;
        this.interval = setInterval(() => {
            const h1 = el === null ? 0 : el.clientHeight;
            const h2 = el2 === null ? 0 : el2.clientHeight + 24;
            if (h1 + h2 > 0 || count > limit) {
                clearInterval(this.interval);
                this.top = h1 + h2;
            }
            count++;
        }, intervalTime);
    }

    public ngOnDestroy() {
        if (this.interval === undefined) {
            return;
        }
        clearInterval(this.interval);
    }
}
