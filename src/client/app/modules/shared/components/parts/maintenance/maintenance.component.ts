import { Component, Input, OnInit } from '@angular/core';
import { IConfirm } from '../../../../../services';

@Component({
    selector: 'app-maintenance',
    templateUrl: './maintenance.component.html',
    styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
    @Input() public maintenanceInfo: IConfirm;

    constructor() { }

    public ngOnInit() {
    }

}
