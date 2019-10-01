import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { PurchaseSort, SelectService, UserService } from '../../../../../services';

@Component({
    selector: 'app-member-mypage',
    templateUrl: './member-mypage.component.html',
    styleUrls: ['./member-mypage.component.scss']
})
export class MemberMypageComponent implements OnInit {
    public isLoading: boolean;

    constructor(
        public user: UserService,
        private select: SelectService,
        private router: Router
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        this.isLoading = true;
        try {
            if (this.user.data.userName === undefined) {
                this.user.setUserName();
            }
            await this.user.updateAccount();
        } catch (err) {
            this.router.navigate(['/error', { redirect: '/member/mypage' }]);
            console.log('MemberMypageComponent.ngOnInit', err);
        }
        this.isLoading = false;
    }

    /**
     * チケット購入へ移動（上映時間順）
     * @method redirectToPurchaseTime
     */
    public redirectToPurchaseTime() {
        this.select.data.purchase.date = moment().format('YYYYMMDD');
        this.select.data.purchase.sort = PurchaseSort.Time;
        this.router.navigate(['/purchase']);
    }

    /**
     * チケット購入へ移動（作品順）
     * @method redirectToPurchaseFilm
     */
    public redirectToPurchaseFilm() {
        this.select.data.purchase.sort = PurchaseSort.Film;
        this.router.navigate(['/purchase']);
    }

}
