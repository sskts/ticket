/**
 * BaseComponent
 */
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

    constructor() { }

    /**
     * 初期化
     * @method ngOnInit
     * @returns {Promise<void>}
     */
    public async ngOnInit(): Promise<void> {
    }

}
