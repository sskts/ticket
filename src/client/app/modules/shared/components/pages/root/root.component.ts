import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationStatus } from '../../../../../models/util';
import { UserService, UtilService } from '../../../../../services';

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {
    constructor(
        private user: UserService,
        private utilService: UtilService,
        private router: Router
    ) {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        try {
            if (this.user.isMember()) {
                await this.user.updateAccount();
                const { status } =
                    await this.utilService.getApplicationStatus();
                if (status === ApplicationStatus.MEMBERSHIP_COUPON_CLOSE) {
                    this.router.navigate(['/member/mypage']);
                    return;
                }
            }
        } catch (error) {
            console.error(error);
        }
        this.router.navigate(['/auth/select']);
    }
}
