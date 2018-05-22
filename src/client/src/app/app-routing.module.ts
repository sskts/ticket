/**
 * ルーティング
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AuthLogoutComponent } from './components/auth/auth-logout/auth-logout.component';
import { AuthRegisterTermsComponent } from './components/auth/auth-register-terms/auth-register-terms.component';
import { AuthRegisterComponent } from './components/auth/auth-register/auth-register.component';
import { AuthSelectComponent } from './components/auth/auth-select/auth-select.component';
import { AuthSigninComponent } from './components/auth/auth-signin/auth-signin.component';
import { AuthSignoutComponent } from './components/auth/auth-signout/auth-signout.component';
import { BaseComponent } from './components/base/base.component';
import { ErrorComponent } from './components/error/error.component';
import { LawComponent } from './components/law/law.component';
import { MemberBenefitsComponent } from './components/member/member-benefits/member-benefits.component';
import { MemberEditCreditComponent } from './components/member/member-edit-credit/member-edit-credit.component';
import { MemberEditProfileComponent } from './components/member/member-edit-profile/member-edit-profile.component';
import { MemberEditComponent } from './components/member/member-edit/member-edit.component';
import { MemberMypageComponent } from './components/member/member-mypage/member-mypage.component';
import { MemberPaymentComponent } from './components/member/member-payment/member-payment.component';
import { MemberPointHistoryComponent } from './components/member/member-point-history/member-point-history.component';
import { MemberPointComponent } from './components/member/member-point/member-point.component';
import { MemberWithdrawComponent } from './components/member/member-withdraw/member-withdraw.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PolicyComponent } from './components/policy/policy.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { RootComponent } from './components/root/root.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { WalkThroughComponent } from './components/walk-through/walk-through.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { CreditGuardService } from './services/credit-guard/credit-guard.service';
import { MemberGuardService } from './services/member-guard/member-guard.service';

const appRoutes: Routes = [
    { path: '', redirectTo: '/root', pathMatch: 'full' },
    { path: 'root', canActivate: [AuthGuardService], component: RootComponent },
    {
        path: 'auth',
        children: [
            { path: 'select', component: AuthSelectComponent },
            { path: 'signin', component: AuthSigninComponent },
            { path: 'signout', component: AuthSignoutComponent },
            {
                path: 'register',
                children: [
                    { path: '', component: AuthRegisterComponent },
                    { path: 'terms', component: AuthRegisterTermsComponent }
                ]
            }
        ]
    },
    {
        path: 'auth',
        component: BaseComponent,
        children: [
            { path: 'logout', component: AuthLogoutComponent }
        ]
    },
    {
        path: '',
        component: BaseComponent,
        canActivate: [AuthGuardService],
        children: [
            { path: 'ticket', component: TicketComponent },
            { path: 'purchase', component: PurchaseComponent },
            { path: 'about', component: AboutComponent },
            { path: 'policy', component: PolicyComponent },
            { path: 'law', component: LawComponent },
            { path: 'privacy', component: PrivacyComponent }
        ]
    },
    {
        path: 'member',
        canActivate: [MemberGuardService],
        children: [
            { path: 'payment', component: MemberPaymentComponent }
        ]
    },
    {
        path: 'member',
        component: BaseComponent,
        canActivate: [MemberGuardService, CreditGuardService],
        children: [
            { path: 'mypage', component: MemberMypageComponent },
            { path: 'benefits', component: MemberBenefitsComponent },
            { path: 'withdraw', component: MemberWithdrawComponent },
            {
                path: 'point',
                children: [
                    { path: '', component: MemberPointComponent },
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
    },
    { path: 'walkThrough', component: WalkThroughComponent },
    { path: 'error/:redirect', component: ErrorComponent },
    { path: 'error', component: ErrorComponent },
    { path: '**', component: NotFoundComponent }
];

// tslint:disable-next-line:no-stateless-class
@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { useHash: true, enableTracing: true }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
