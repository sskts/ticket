import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';

/**
 * HeaderMenuMemberComponent
 */
@Component({
    selector: 'app-header-menu-member',
    templateUrl: './header-menu-member.component.html',
    styleUrls: ['./header-menu-member.component.scss']
})
export class HeaderMenuMemberComponent implements OnInit {
    @Output() public close: EventEmitter<{}> = new EventEmitter();
    @Output() public openWebBrowse: EventEmitter<string> = new EventEmitter();
    public environment = environment;

    constructor() { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
    }

}
