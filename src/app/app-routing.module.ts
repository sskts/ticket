/**
 * ルーティング
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { AuthBaseComponent } from './components/auth/auth-base/auth-base.component';
import { AuthIndexComponent } from './components/auth/auth-index/auth-index.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { BaseComponent } from './components/base/base.component';
import { LawComponent } from './components/law/law.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PolicyComponent } from './components/policy/policy.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ScheduleComponent } from './components/purchase/schedule/schedule.component';
import { TicketHolderComponent } from './components/ticket/ticket-holder/ticket-holder.component';
import { WalkThroughComponent } from './components/walk-through/walk-through.component';
import { AuthGuardService } from './service/auth-guard/auth-guard.service';

const appRoutes: Routes = [
    { path: '', redirectTo: '/ticket', pathMatch: 'full' },
    {
        path: '',
        component: BaseComponent,
        canActivate: [AuthGuardService],
        children: [
            { path: 'ticket', component: TicketHolderComponent },
            { path: 'purchase', component: ScheduleComponent },
            { path: 'about', component: AboutComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'policy', component: PolicyComponent },
            { path: 'law', component: LawComponent },
            { path: 'privacy', component: PrivacyComponent }
        ]
    },
    { path: 'auth', component: AuthIndexComponent },
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
