import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
    selector: 'app-alert-modal',
    templateUrl: './alert-modal.component.html',
    styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {
    @Input() public title: string;
    @Input() public body: string;
    @Input() public cb?: Function;

    constructor(
        public modal: BsModalRef
    ) { }

    public ngOnInit() {
    }

    public close() {
        this.modal.hide();
        if (this.cb === undefined) {
            return;
        }
        this.cb();
    }

}
