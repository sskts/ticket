/**
 * HeaderMenuComponent
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CallNativeService, InAppBrowserTarget } from '../../../services/call-native/call-native.service';
import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'app-header-menu',
    templateUrl: './header-menu.component.html',
    styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {
    @Input() public isOpen: boolean;
    @Output() public close: EventEmitter<{}> = new EventEmitter();

    constructor(
        private callNative: CallNativeService,
        public user: UserService
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     * @returns {Promise<void>}
     */
    public ngOnInit(): void {
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
