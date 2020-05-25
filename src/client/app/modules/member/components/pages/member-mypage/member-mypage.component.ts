import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/api-javascript-client';
import * as moment from 'moment';
import { UserService, UtilService } from '../../../../../services';

@Component({
    selector: 'app-member-mypage',
    templateUrl: './member-mypage.component.html',
    styleUrls: ['./member-mypage.component.scss']
})
export class MemberMypageComponent implements OnInit {
    public isLoading: boolean;
    public moment = moment;
    public account: factory.ownershipInfo.IOwnershipInfo<factory.pecorino.account.IAccount<factory.accountType>>;
    public availableBalance: number;
    public programMembershipOwnershipInfo: factory.ownershipInfo.IOwnershipInfo<
        factory.ownershipInfo.IGood<
            factory.programMembership.ProgramMembershipType.ProgramMembership
        >
    >;


    constructor(
        public userService: UserService,
        public utilService: UtilService,
        private router: Router
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        this.isLoading = true;
        this.availableBalance = 0;
        try {
            if (this.userService.data.userName === undefined) {
                this.userService.setUserName();
            }
            await this.userService.updateAccount();
            this.account = this.userService.data.accounts[0];
            this.availableBalance = this.userService.getAvailableBalance();
            this.programMembershipOwnershipInfo = this.userService.data.programMembershipOwnershipInfos[0];
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error', { redirect: '/member/mypage' }]);
        }
        this.isLoading = false;
    }

    /**
     * ポイントモーダル表示
     */
    public openPointModal(event: Event) {
        event.preventDefault();
        this.utilService.openAlert({
            title: 'ポイント使用方法',
            body: ' チケット購入ページで券種選択を選択する際に、会員ポイントを使用することができます。<br> そちらでポイントを使用してください。'
        });
    }

}
