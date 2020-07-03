import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap';
import { cms } from '../../../../../models';
import { CallNativeService, InAppBrowserTarget } from '../../../../../services';

@Component({
    selector: 'app-movie-detail-modal',
    templateUrl: './movie-detail-modal.component.html',
    styleUrls: ['./movie-detail-modal.component.scss']
})
export class MovieDetailModalComponent implements OnInit {
    @Input() public routerLink: boolean;
    @Input() public data: { title: cms.schedule.ITitle, schedule: cms.schedule.ISchedule[] };
    public moment = moment;

    constructor(
        public modal: BsModalRef,
        public callNativeService: CallNativeService
    ) { }

    public ngOnInit() {
    }

    /**
     * webブラウザで開く
     */
    public openWebBrowse(url: string) {
        this.callNativeService.inAppBrowser({
            url: url,
            target: InAppBrowserTarget.System
        });
    }

    public close() {
        this.modal.hide();
    }
}
