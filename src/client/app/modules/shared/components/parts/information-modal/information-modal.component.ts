import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

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
    @Input() public images: string[];
    @Input() public button?: {
        label: string;
        link: string;
    };
    @Input() public cb?: Function;
    public notWatch: boolean;

    constructor(public modal: BsModalRef) { }

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
}
