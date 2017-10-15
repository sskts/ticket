/**
 * HeaderMenuComponent
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-header-menu',
    templateUrl: './header-menu.component.html',
    styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {
    @Input() public isOpen: boolean;
    @Output() public logout: EventEmitter<{}> = new EventEmitter();
    @Output() public close: EventEmitter<{}> = new EventEmitter();
    public portalSite: string;

    constructor() { }

    public ngOnInit() {
        this.portalSite = environment.portalSite;
    }
}
