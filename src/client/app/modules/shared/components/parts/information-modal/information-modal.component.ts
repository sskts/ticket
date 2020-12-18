import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { CallNativeService, InAppBrowserTarget } from '../../../../../services';

@Component({
    selector: 'app-information-modal',
    templateUrl: './information-modal.component.html',
    styleUrls: ['./information-modal.component.scss']
})
export class InformationModalComponent implements OnInit {
    @Input() public index: number;
    @Input() public id: string;
    @Input() public title?: string;
    @Input() public description?: string;
    @Input() public image: string;
    @Input() public url?: string;
    @Input() public cb?: Function;
    public notWatch: boolean;

    constructor(
        public modal: BsModalRef,
        private callNative: CallNativeService
    ) { }

    public ngOnInit() {
        this.notWatch = false;
    }

    public close() {
        this.modal.hide();
        if (this.cb === undefined) {
            return;
        }
        this.cb({ notWatch: this.notWatch, index: this.index, id: this.id });
    }

    /**
     * webブラウザで開く
     * @method openWebBrowser
     */
    public openWebBrowser(url: string) {
        this.callNative.inAppBrowser({
            url: url,
            target: InAppBrowserTarget.System
        });
    }
}
