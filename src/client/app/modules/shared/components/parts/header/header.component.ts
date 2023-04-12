/**
 * HeaderComponent
 */
import { Component, OnInit } from '@angular/core';
import { ApplicationStatus } from '../../../../../models/util';
import { UserService, UtilService } from '../../../../../services';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
/**
 * ヘッダー
 * @class HeaderComponent
 * @implements OnInit
 */
export class HeaderComponent implements OnInit {
    public isMenuOpen: boolean;
    public isMember: boolean;
    public applicationStatus?: ApplicationStatus;

    constructor(
        public userService: UserService,
        private utilService: UtilService
    ) {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
        this.isMenuOpen = false;
        this.isMember = this.userService.isMember();
    }

    public async menuToggle() {
        if (this.isMenuOpen) {
            this.isMenuOpen = false;
            return;
        }
        try {
            const { status } = await this.utilService.getApplicationStatus();
            this.applicationStatus = status;
            this.isMenuOpen = true;
        } catch (error) {
            console.error(error);
        }
    }
}
