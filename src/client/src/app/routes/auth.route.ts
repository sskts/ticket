import { AuthLogoutComponent } from '../components/pages/auth/auth-logout/auth-logout.component';
import { AuthRegisterCreditComponent } from '../components/pages/auth/auth-register-credit/auth-register-credit.component';
import {
    AuthRegisterProgramMembershipComponent
} from '../components/pages/auth/auth-register-program-membership/auth-register-program-membership.component';
import { AuthRegisterTermsComponent } from '../components/pages/auth/auth-register-terms/auth-register-terms.component';
import { AuthRegisterComponent } from '../components/pages/auth/auth-register/auth-register.component';
import { AuthSelectComponent } from '../components/pages/auth/auth-select/auth-select.component';
import { AuthSigninComponent } from '../components/pages/auth/auth-signin/auth-signin.component';
import { AuthSignoutComponent } from '../components/pages/auth/auth-signout/auth-signout.component';
import { BaseComponent } from '../components/pages/base/base.component';
import { MemberGuardService } from '../services/member-guard/member-guard.service';

/**
 * 認証ルーティング
 */
export const route = {
    path: 'auth',
    children: [
        { path: 'select', component: AuthSelectComponent },
        { path: 'signin', component: AuthSigninComponent },
        { path: 'signout', component: AuthSignoutComponent },
        {
            path: 'register',
            children: [
                { path: '', component: AuthRegisterComponent },
                { path: 'terms', component: AuthRegisterTermsComponent },
                { path: 'credit', canActivate: [MemberGuardService], component: AuthRegisterCreditComponent },
                { path: 'membership', canActivate: [MemberGuardService], component: AuthRegisterProgramMembershipComponent }
            ]
        }
    ]
};

/**
 * ログアウトルーティング
 */
export const logoutRoute = {
    path: 'auth',
    component: BaseComponent,
    children: [
        { path: 'logout', component: AuthLogoutComponent }
    ]
};
