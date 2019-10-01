import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberBenefitsComponent } from './components/pages/member-benefits/member-benefits.component';
import { MemberEditCreditComponent } from './components/pages/member-edit-credit/member-edit-credit.component';
import { MemberEditProfileComponent } from './components/pages/member-edit-profile/member-edit-profile.component';
import { MemberEditComponent } from './components/pages/member-edit/member-edit.component';
import { MemberMypageComponent } from './components/pages/member-mypage/member-mypage.component';
import { MemberPointHistoryComponent } from './components/pages/member-point-history/member-point-history.component';
import { MemberPointComponent } from './components/pages/member-point/member-point.component';
import { MemberTicketHistoryComponent } from './components/pages/member-ticket-history/member-ticket-history.component';
import { MemberWithdrawComponent } from './components/pages/member-withdraw/member-withdraw.component';

const routes: Routes = [
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
    },
    {
        path: 'ticket',
        children: [
            { path: 'history', component: MemberTicketHistoryComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MemberRoutingModule { }
