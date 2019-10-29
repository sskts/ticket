import { Component, OnInit } from '@angular/core';
import { CinerinoService, MemberService, UserService } from '../../../../../services';

@Component({
    selector: 'app-member-withdraw',
    templateUrl: './member-withdraw.component.html',
    styleUrls: ['./member-withdraw.component.scss']
})
export class MemberWithdrawComponent implements OnInit {
    public isLoading: boolean;
    public confirmModal: boolean;
    constructor(
        private cinerino: CinerinoService,
        private user: UserService,
        private member: MemberService
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
        this.isLoading = false;
        this.confirmModal = false;
    }

    /**
     * 退会
     * @method withdraw
     */
    public async withdraw() {
        this.isLoading = true;
        try {
            // 会員プログラム削除
            const ownershipInfoIdentifier = this.user.data.programMembershipOwnershipInfos[0].identifier;
            await this.member.unRegister({
                ownershipInfoIdentifier: ownershipInfoIdentifier
            });

            // クレジットカード削除
            await this.user.deleteCreditCard().catch((err) => {
                console.error(err);
            });
            await this.cinerino.signOut();
        } catch (err) {
            console.error(err);
            this.isLoading = false;
        }
    }

}
