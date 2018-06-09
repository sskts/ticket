import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaveType, StorageService } from '../../services/storage/storage.service';
import { UserService } from '../../services/user/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
    constructor(
        private user: UserService,
        private storage: StorageService,
        private router: Router
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
        const device = this.storage.load('device', SaveType.Local);
        if (device === null || !device.tutorial) {
            this.router.navigate(['/walkThrough']);

            return;
        }
        if (this.user.isMember()) {
            this.router.navigate(['/member/mypage']);
        } else {
            this.router.navigate(['/ticket']);
        }
    }

}
