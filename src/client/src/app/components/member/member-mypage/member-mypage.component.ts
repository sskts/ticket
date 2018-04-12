import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'app-member-mypage',
    templateUrl: './member-mypage.component.html',
    styleUrls: ['./member-mypage.component.scss']
})
export class MemberMypageComponent implements OnInit {
    public isLoading: boolean;

    constructor(
        private router: Router,
        private user: UserService
    ) { }

    public ngOnInit() {
        if (!this.user.isMember()) {
            this.router.navigate(['/ticket']);
        }
    }

}
