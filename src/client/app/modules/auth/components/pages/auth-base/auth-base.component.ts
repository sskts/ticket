/**
 * BaseComponent
 */
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../services';

@Component({
    selector: 'app-auth-base',
    templateUrl: './auth-base.component.html',
    styleUrls: ['./auth-base.component.scss']
})
export class AuthBaseComponent implements OnInit {

    constructor(
        public user: UserService
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
    }

}
