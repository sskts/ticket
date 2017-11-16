/**
 * MenuComponent
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    @Input() public isOpen: boolean;
    @Output() public logout: EventEmitter<{}> = new EventEmitter();
    @Output() public close: EventEmitter<{}> = new EventEmitter();
    public portalSite: string;

    constructor() { }

    /**
     * 初期化
     * @method ngOnInit
     * @returns {Promise<void>}
     */
    public ngOnInit(): void {
        this.portalSite = environment.portalSite;
    }

    public browserOpen(url: string): void {
        // const domain = new URL(url).host;
        window.open(url);
    }
}
