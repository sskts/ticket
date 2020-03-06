import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../../services';

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
    constructor(
        private user: UserService,
        private router: Router
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        try {
            if (this.user.isMember()) {
                await this.user.updateAccount();
            }
        } catch (error) {
            console.error(error);
        }
        this.router.navigate(['/purchase']);
    }

}
