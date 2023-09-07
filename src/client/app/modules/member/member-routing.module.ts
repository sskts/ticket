import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberBenefitsComponent } from './components/pages/member-benefits/member-benefits.component';
import { MemberEditCreditComponent } from './components/pages/member-edit-credit/member-edit-credit.component';
import { MemberEditProfileComponent } from './components/pages/member-edit-profile/member-edit-profile.component';
import { MemberEditComponent } from './components/pages/member-edit/member-edit.component';
import { MemberMypageComponent } from './components/pages/member-mypage/member-mypage.component';
import { MemberPointHistoryComponent } from './components/pages/member-point-history/member-point-history.component';
import { MemberTicketHistoryComponent } from './components/pages/member-ticket-history/member-ticket-history.component';
import { MemberTransferComponent } from './components/pages/member-transfer/member-transfer.component';
import { MemberWithdrawComponent } from './components/pages/member-withdraw/member-withdraw.component';
import { statusGuardService } from '../../guards/status-guard.service';
import { MemberMypageCloseComponent } from './components/pages/member-mypage-close/member-mypage-close.component';

const routes: Routes = [
    {
        path: 'mypage',
        canActivate: [statusGuardService],
        component: MemberMypageComponent,
    },
    { path: 'mypage/close', component: MemberMypageCloseComponent },
    { path: 'withdraw', component: MemberWithdrawComponent },
    { path: 'transfer', component: MemberTransferComponent },
    {
        path: 'point',
        children: [
            {
                path: 'benefits',
                canActivate: [statusGuardService],
                component: MemberBenefitsComponent,
            },
            {
                path: 'history',
                canActivate: [statusGuardService],
                component: MemberPointHistoryComponent,
            },
        ],
    },
    {
        path: 'edit',
        children: [
            {
                path: '',
                canActivate: [statusGuardService],
                component: MemberEditComponent,
            },
            {
                path: 'credit',
                canActivate: [statusGuardService],
                component: MemberEditCreditComponent,
            },
            {
                path: 'profile',
                canActivate: [statusGuardService],
                component: MemberEditProfileComponent,
            },
        ],
    },
    {
        path: 'ticket',
        children: [
            {
                path: 'history',
                canActivate: [statusGuardService],
                component: MemberTicketHistoryComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MemberRoutingModule {}
