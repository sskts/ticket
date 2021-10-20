import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { environment } from '../../../../../../environments/environment';
import { CallNativeService, InAppBrowserTarget } from '../../../../../services';

@Component({
    selector: 'app-appear-popup',
    templateUrl: './appear-popup.component.html',
    styleUrls: ['./appear-popup.component.scss'],
})
export class AppearPopupComponent implements OnInit {
    @Input() public cb: Function;
    public environment = environment;

    constructor(
        public modal: BsModalRef,
        private callNativeService: CallNativeService
    ) {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {}

    public close() {
        this.modal.hide();
        this.cb();
    }

    /**
     * webブラウザで開く
     * @method openWebBrowser
     */
    public openWebBrowser(url: string, event: Event) {
        event.preventDefault();
        this.callNativeService.inAppBrowser({
            url: url,
            target: InAppBrowserTarget.System,
        });
    }
}
