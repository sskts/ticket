/**
 * HeaderMenuComponent
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CallNativeService, InAppBrowserTarget } from '../../../services/call-native/call-native.service';
import { SasakiService } from '../../../services/sasaki/sasaki.service';

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

    constructor(
        private callNative: CallNativeService,
        public sasaki: SasakiService
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     * @returns {Promise<void>}
     */
    public ngOnInit(): void {
        this.portalSite = environment.PORTAL_SITE;
    }

    /**
     * webブラウザで開く
     * @method openWebBrowse
     * @param {string} url
     */
    public openWebBrowse(url: string): void {
        this.callNative.inAppBrowser({
            url: url,
            target: InAppBrowserTarget.System
        });
        this.close.emit();
    }
}
