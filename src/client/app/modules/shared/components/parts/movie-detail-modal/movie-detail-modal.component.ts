import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    public Format = {
        System: cms.schedule.System,
        Sound: cms.schedule.Sound,
        Voice: cms.schedule.Voice,
    };


    constructor(
        public modal: BsModalRef,
        public router: Router,
        public callNativeService: CallNativeService
    ) { }

    public ngOnInit() {
    }

    /**
     * webブラウザで開く
     */
    public openWebBrowse(event: Event, url: string) {
        event.preventDefault();
        this.callNativeService.inAppBrowser({
            url: url,
            target: InAppBrowserTarget.System
        });
    }

    public close() {
        this.router.navigate(['/purchase']);
        this.modal.hide();
    }
}
