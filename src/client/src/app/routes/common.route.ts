import { AboutComponent } from '../components/pages/about/about.component';
import { BaseComponent } from '../components/pages/base/base.component';
import { BenefitsComponent } from '../components/pages/benefits/benefits.component';
import { LawComponent } from '../components/pages/law/law.component';
import { PolicyComponent } from '../components/pages/policy/policy.component';
import { PrizeComponent } from '../components/pages/prize/prize.component';
import { PrivacyComponent } from '../components/pages/privacy/privacy.component';
import { PurchaseComponent } from '../components/pages/purchase/purchase.component';
import { RootComponent } from '../components/pages/root/root.component';
import { TicketComponent } from '../components/pages/ticket/ticket.component';
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
        { path: 'benefits', component: BenefitsComponent },
        { path: 'prize', component: PrizeComponent }
    ]
};

/**
 * ルートルーティング
 */
export const rootRoute = {
    path: 'root', canActivate: [TutorialGuardService, AuthGuardService], component: RootComponent
};
