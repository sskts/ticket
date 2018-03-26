import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-member-withdraw',
    templateUrl: './member-withdraw.component.html',
    styleUrls: ['./member-withdraw.component.scss']
})
export class MemberWithdrawComponent implements OnInit {
    public isLoading: boolean;
    constructor() { }

    public ngOnInit() {
        this.isLoading = false;
    }

    public withdraw() {
        this.isLoading = true;
        this.isLoading = false;
    }

}
