import { AboutComponent } from '../components/about/about.component';
import { BaseComponent } from '../components/base/base.component';
import { BenefitsComponent } from '../components/benefits/benefits.component';
import { LawComponent } from '../components/law/law.component';
import { PolicyComponent } from '../components/policy/policy.component';
import { PrivacyComponent } from '../components/privacy/privacy.component';
import { PurchaseComponent } from '../components/purchase/purchase.component';
import { RootComponent } from '../components/root/root.component';
import { TicketComponent } from '../components/ticket/ticket.component';
import { AuthGuardService } from '../services/auth-guard/auth-guard.service';
import { TutorialGuardService } from '../services/tutorial-guard/tutorial-guard.service';

/**
 * 認証ルーティング
 */
export const route = {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuardService],
    children: [
        { path: 'ticket', component: TicketComponent },
        { path: 'purchase', component: PurchaseComponent },
        { path: 'about', component: AboutComponent },
        { path: 'policy', component: PolicyComponent },
        { path: 'law', component: LawComponent },
        { path: 'privacy', component: PrivacyComponent },
        { path: 'benefits', component: BenefitsComponent }
    ]
};

/**
 * ルートルーティング
 */
export const rootRoute = {
    path: 'root', canActivate: [TutorialGuardService, AuthGuardService], component: RootComponent
};
