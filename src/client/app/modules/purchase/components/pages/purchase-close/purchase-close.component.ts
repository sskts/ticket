/**
 * PurchaseComponent
 */
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-purchase-close',
    templateUrl: './purchase-close.component.html',
    styleUrls: ['./purchase-close.component.scss'],
})
/**
 * 購入
 * @class PurchaseCloseComponent
 * @implements OnInit
 */
export class PurchaseCloseComponent implements OnInit {
    public isLoading: boolean;

    constructor() {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        this.isLoading = false;
    }
}
