/**
 * ルーティング
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { BaseComponent } from './components/base/base.component';
import { ErrorComponent } from './components/error/error.component';
import { LawComponent } from './components/law/law.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PolicyComponent } from './components/policy/policy.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { WalkThroughComponent } from './components/walk-through/walk-through.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { AuthSelectComponent } from './components/auth/auth-select/auth-select.component';
import { AuthRegisterComponent } from './components/auth/auth-register/auth-register.component';
import { AuthSignOutComponent } from './components/auth/auth-sign-out/auth-sign-out.component';
import { MemberBenefitsComponent } from './components/member/member-benefits/member-benefits.component';
import { MemberEditComponent } from './components/member/member-edit/member-edit.component';
import { MemberWithdrawComponent } from './components/member/member-withdraw/member-withdraw.component';
import { MemberGuardService } from './services/member-guard/member-guard.service';

const appRoutes: Routes = [
    { path: '', redirectTo: '/ticket', pathMatch: 'full' },
    { path: 'auth', component: AuthSelectComponent },
    {
        path: 'auth',
        children: [
            { path: 'select', component: AuthSelectComponent },
            { path: 'register', component: AuthRegisterComponent },
            { path: 'signOut', component: AuthSignOutComponent }
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
        component: BaseComponent,
        canActivate: [MemberGuardService],
        children: [
            { path: 'benefits', component: MemberBenefitsComponent },
            { path: 'edit', component: MemberEditComponent },
            { path: 'withdraw', component: MemberWithdrawComponent }
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
