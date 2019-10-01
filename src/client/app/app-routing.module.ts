/**
 * ルーティング
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    AuthGuardService,
    MemberGuardService,
    ProgramMembershipGuardService,
    TutorialGuardService
} from './guards';
import { ErrorModule } from './modules/error/error.module';
import { AboutComponent } from './modules/shared/components/pages/about/about.component';
import { BaseComponent } from './modules/shared/components/pages/base/base.component';
import { BenefitsComponent } from './modules/shared/components/pages/benefits/benefits.component';
import { LawComponent } from './modules/shared/components/pages/law/law.component';
import { PolicyComponent } from './modules/shared/components/pages/policy/policy.component';
import { PrivacyComponent } from './modules/shared/components/pages/privacy/privacy.component';
import { RootComponent } from './modules/shared/components/pages/root/root.component';
import { TutorialComponent } from './modules/shared/components/pages/tutorial/tutorial.component';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
    { path: '', redirectTo: '/root', pathMatch: 'full' },
    {
        path: 'root',
        canActivate: [TutorialGuardService, AuthGuardService],
        component: RootComponent
    },
    {
        path: '',
        component: BaseComponent,
        canActivate: [AuthGuardService],
        children: [
            { path: 'about', component: AboutComponent },
            { path: 'policy', component: PolicyComponent },
            { path: 'law', component: LawComponent },
            { path: 'privacy', component: PrivacyComponent },
            { path: 'benefits', component: BenefitsComponent }
        ]
    },
    { path: 'tutorial', component: TutorialComponent },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'purchase',
        component: BaseComponent,
        canActivate: [AuthGuardService],
        loadChildren: () => import('./modules/purchase/purchase.module').then(m => m.PurchaseModule)
    },
    {
        path: 'ticket',
        component: BaseComponent,
        canActivate: [AuthGuardService],
        loadChildren: () => import('./modules/ticket/ticket.module').then(m => m.TicketModule)
    },
    {
        path: 'member',
        component: BaseComponent,
        canActivate: [AuthGuardService, MemberGuardService, ProgramMembershipGuardService],
        loadChildren: () => import('./modules/member/member.module').then(m => m.MemberModule)
    },
    {
        path: '',
        loadChildren: () => ErrorModule
    }
];

// tslint:disable-next-line:no-stateless-class
@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { useHash: true, enableTracing: !environment.production }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
