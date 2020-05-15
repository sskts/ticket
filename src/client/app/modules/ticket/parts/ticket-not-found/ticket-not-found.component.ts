import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-ticket-not-found',
    templateUrl: './ticket-not-found.component.html',
    styleUrls: ['./ticket-not-found.component.scss']
})
export class TicketNotFoundComponent implements OnInit, OnDestroy {
    @Input() public isMember: boolean;
    public interval: any;
    public top: number;
    constructor() { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
        this.top = 0;
        const el = document.querySelector('app-campaign');
        if (el === null) {
            return;
        }
        let count = 0;
        const limit = 10;
        const intervalTime = 500;
        this.interval = setInterval(() => {
            if (el.clientHeight > 0 || count > limit) {
                clearInterval(this.interval);
                this.top = el.clientHeight;
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
