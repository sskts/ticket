/**
 * TicketComponent
 */
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-ticket-close',
    templateUrl: './ticket-close.component.html',
    styleUrls: ['./ticket-close.component.scss'],
})
/**
 * チケットホルダー
 * @class TicketCloseComponent
 * @implements OnInit
 */
export class TicketCloseComponent implements OnInit {
    public isLoading: boolean;

    constructor() {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        this.isLoading = false;
    }
}
