/**
 * TicketComponent
 */
import { Component, Input, OnInit } from '@angular/core';
import * as sasaki from '@motionpicture/sskts-api-javascript-client';

@Component({
    selector: 'app-ticket',
    templateUrl: './ticket.component.html',
    styleUrls: ['./ticket.component.scss']
})
/**
 * チケット
 * @class TicketComponent
 * @implements OnInit
 */
export class TicketComponent implements OnInit {
    @Input() public reservation: sasaki.factory.order.IOrder;

    constructor() { }

    /**
     * 初期化
     * @method ngOnInit
     * @returns {void}
     */
    public ngOnInit(): void {
    }

}
