import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
    public isLoading: boolean;
    constructor(
        private user: UserService,
        private router: Router
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
        this.isLoading = true;
        if (this.user.isMember()) {
            this.router.navigate(['/member/mypage']);
        } else {
            this.router.navigate(['/ticket']);
        }
    }

}
