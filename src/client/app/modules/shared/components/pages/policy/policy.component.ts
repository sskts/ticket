/**
 * PolicyComponent
 */
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../services';

@Component({
    selector: 'app-policy',
    templateUrl: './policy.component.html',
    styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

    constructor(public user: UserService) { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
    }

}
