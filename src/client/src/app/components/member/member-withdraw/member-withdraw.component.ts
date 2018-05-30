import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-member-withdraw',
    templateUrl: './member-withdraw.component.html',
    styleUrls: ['./member-withdraw.component.scss']
})
export class MemberWithdrawComponent implements OnInit {
    public isLoading: boolean;
    constructor() { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
        window.scrollTo(0, 0);
        this.isLoading = false;
    }

    /**
     * 退会
     * @method withdraw
     */
    public withdraw() {
        this.isLoading = true;
        this.isLoading = false;
    }

}
