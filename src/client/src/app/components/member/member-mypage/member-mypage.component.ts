import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { PurchaseSort, SelectService } from '../../../services/select/select.service';
import { UserService } from '../../../services/user/user.service';

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

    public async ngOnInit() {
        this.isLoading = true;
        try {
            await this.user.updateAccount();
        } catch (err) {
            this.router.navigate(['/error', { redirect: '/member/mypage' }]);
            console.log('MemberMypageComponent.ngOnInit', err);
        }
        this.isLoading = false;
    }

    /**
     * チケット購入へ移動（上映時間順）
     */
    public toPurchaseTime() {
        this.select.getSelect();
        this.select.data.purchase.date = moment().format('YYYYMMDD');
        this.select.data.purchase.sort = PurchaseSort.Time;
        this.router.navigate(['/purchase']);
    }

    /**
     * チケット購入へ移動（作品順）
     */
    public toPurchaseFilm() {
        this.select.getSelect();
        this.select.data.purchase.sort = PurchaseSort.Film;
        this.router.navigate(['/purchase']);
    }

}
