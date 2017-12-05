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

    /**
     * webブラウザで開く
     * @method externalLink
     * @param {string} url
     */
    public externalLink(url: string): void {
        if (window !== window.parent) {
            const data = JSON.stringify({
                method: 'externalLink',
                value: url
            });
            window.parent.postMessage(data, '*');
            this.close.emit();

            return;
        }
        const userAgent = navigator.userAgent.toLowerCase();
        const os = (/ipad|iphone|ipod/.test(userAgent) && !(<any>window).MSStream) ? 'ios'
            : (/android/i.test(userAgent)) ? 'android'
                : 'web';
        try {
            switch (os) {
                case 'ios':
                    (<any>window).webkit.messageHandlers.openExternalRule.postMessage({
                        EXTERN_URL: url
                    });
                    break;
                case 'android':
                    (<any>global).JSInterface.openExternalRule(url);
                    break;
                default:
                    const win = window.open(url, '_blank');
                    if (win) {
                        win.focus();
                    } else {
                        alert('Please allow popups for this website');
                    }
            }
        } catch (err) {
            console.error(err);
        }
        this.close.emit();
    }
}
