/**
 * ルーティング
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { AuthBaseComponent } from './components/auth-base/auth-base.component';
import { AuthComponent } from './components/auth/auth.component';
import { BaseComponent } from './components/base/base.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LawComponent } from './components/law/law.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PolicyComponent } from './components/policy/policy.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TicketHolderComponent } from './components/ticket-holder/ticket-holder.component';
import { WalkThroughComponent } from './components/walk-through/walk-through.component';
import { AuthGuardService } from './service/auth-guard/auth-guard.service';

const appRoutes: Routes = [
    { path: '', redirectTo: '/ticketHolder', pathMatch: 'full' },
    {
        path: '',
        component: BaseComponent,
        canActivate: [AuthGuardService],
        children: [
            { path: 'ticketHolder', component: TicketHolderComponent },
            { path: 'purchase', component: PurchaseComponent },
            { path: 'about', component: AboutComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'policy', component: PolicyComponent },
            { path: 'law', component: LawComponent },
            { path: 'privacy', component: PrivacyComponent }
        ]
    },
    { path: 'auth', component: AuthComponent },
    {
        path: 'auth',
        component: AuthBaseComponent,
        children: [
            { path: 'signIn', component: SignInComponent },
            { path: 'signUp', component: SignUpComponent },
            { path: 'forgotPassword', component: ForgotPasswordComponent },
            { path: 'walk-through', component: WalkThroughComponent }
        ]
    },
    { path: '**', component: NotFoundComponent }
];

// tslint:disable-next-line:no-stateless-class
@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { useHash: true, enableTracing: true } // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
