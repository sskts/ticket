import { Component, OnInit } from '@angular/core';
import { CinerinoService } from '../../../../../services';

@Component({
    selector: 'app-auth-logout',
    templateUrl: './auth-logout.component.html',
    styleUrls: ['./auth-logout.component.scss']
})
export class AuthLogoutComponent implements OnInit {
    public isLoading: boolean;

    constructor(
        private cinerino: CinerinoService
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
        this.isLoading = false;
    }

    /**
     * サインアウト
     * @method signOut
     */
    public async signOut() {
        this.isLoading = true;
        try {
            await this.cinerino.signOut();
        } catch {
            this.isLoading = false;
        }
    }

}
