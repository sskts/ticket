import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';

/**
 * HeaderMenuNotMemberComponent
 */
@Component({
    selector: 'app-header-menu-not-member',
    templateUrl: './header-menu-not-member.component.html',
    styleUrls: ['./header-menu-not-member.component.scss']
})
export class HeaderMenuNotMemberComponent implements OnInit {
    @Output() public close: EventEmitter<{}> = new EventEmitter();
    @Output() public openWebBrowse: EventEmitter<{}> = new EventEmitter();
    public environment = environment;

    constructor() { }

    public ngOnInit() {
    }

}
