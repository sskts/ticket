import { AuthLogoutComponent } from '../components/auth/auth-logout/auth-logout.component';
import { AuthRegisterPaymentComponent } from '../components/auth/auth-register-payment/auth-register-payment.component';
import { AuthRegisterTermsComponent } from '../components/auth/auth-register-terms/auth-register-terms.component';
import { AuthRegisterComponent } from '../components/auth/auth-register/auth-register.component';
import { AuthSelectComponent } from '../components/auth/auth-select/auth-select.component';
import { AuthSigninComponent } from '../components/auth/auth-signin/auth-signin.component';
import { AuthSignoutComponent } from '../components/auth/auth-signout/auth-signout.component';
import { BaseComponent } from '../components/base/base.component';
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
                { path: 'payment', canActivate: [MemberGuardService], component: AuthRegisterPaymentComponent }
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
