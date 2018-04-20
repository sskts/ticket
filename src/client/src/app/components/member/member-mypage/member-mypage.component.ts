import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'app-member-mypage',
    templateUrl: './member-mypage.component.html',
    styleUrls: ['./member-mypage.component.scss']
})
export class MemberMypageComponent implements OnInit {
    public isLoading: boolean;

    constructor(
    ) { }

    public ngOnInit() {
    }

}
