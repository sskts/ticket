import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, UtilService } from '../../../../../services';
import { ApplicationStatus } from '../../../../../models/util';

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
                const { status } =
                    await this.utilService.getApplicationStatus();
                if (status !== ApplicationStatus.MEMBERSHIP_COUPON_CLOSE) {
                    await this.user.updateAccount();
                }
            }
        } catch (error) {
            console.error(error);
        }
        this.router.navigate(['/purchase']);
    }
}
