/**
 * HeaderMenuComponent
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getConfig } from '../../../../../functions';
import { CallNativeService, InAppBrowserTarget } from '../../../../../services';

@Component({
    selector: 'app-header-menu',
    templateUrl: './header-menu.component.html',
    styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {
    @Input() public isMember: boolean;
    @Input() public isOpen: boolean;
    @Output() public close: EventEmitter<{}> = new EventEmitter();
    public portalSiteUrl: string;

    constructor(private callNative: CallNativeService) {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
        this.portalSiteUrl = getConfig().portalSiteUrl;
    }

    /**
     * webブラウザで開く
     * @method openWebBrowser
     */
    public openWebBrowser(url: string) {
        this.callNative.inAppBrowser({
            url: url,
            target: InAppBrowserTarget.System,
        });
        this.close.emit();
    }
}
