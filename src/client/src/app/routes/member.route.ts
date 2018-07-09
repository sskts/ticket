import { BaseComponent } from '../components/base/base.component';
import { MemberBenefitsComponent } from '../components/member/member-benefits/member-benefits.component';
import { MemberEditCreditComponent } from '../components/member/member-edit-credit/member-edit-credit.component';
import { MemberEditProfileComponent } from '../components/member/member-edit-profile/member-edit-profile.component';
import { MemberEditComponent } from '../components/member/member-edit/member-edit.component';
import { MemberMypageComponent } from '../components/member/member-mypage/member-mypage.component';
import { MemberPointHistoryComponent } from '../components/member/member-point-history/member-point-history.component';
import { MemberPointComponent } from '../components/member/member-point/member-point.component';
import { MemberWithdrawComponent } from '../components/member/member-withdraw/member-withdraw.component';
import { AuthGuardService } from '../services/auth-guard/auth-guard.service';
import { MemberGuardService } from '../services/member-guard/member-guard.service';
import { ProgramMembershipGuardService } from '../services/program-membership-guard/program-membership-guard.service';

/**
 * 会員ルーティング
 */
export const route = {
    path: 'member',
    component: BaseComponent,
    canActivate: [AuthGuardService, MemberGuardService, ProgramMembershipGuardService],
    children: [
        { path: 'mypage', component: MemberMypageComponent },
        { path: 'withdraw', component: MemberWithdrawComponent },
        {
            path: 'point',
            children: [
                { path: '', component: MemberPointComponent },
                { path: 'benefits', component: MemberBenefitsComponent },
                { path: 'history', component: MemberPointHistoryComponent }
            ]
        },
        {
            path: 'edit',
            children: [
                { path: '', component: MemberEditComponent },
                { path: 'credit', component: MemberEditCreditComponent },
                { path: 'profile', component: MemberEditProfileComponent }
            ]
        }
    ]
};
