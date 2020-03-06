import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberGuardService } from '../../guards';
import { BaseComponent } from '../shared/components/pages/base/base.component';
import { AuthBaseComponent } from './components/pages/auth-base/auth-base.component';
import { AuthLogoutComponent } from './components/pages/auth-logout/auth-logout.component';
import { AuthRegisterCreditComponent } from './components/pages/auth-register-credit/auth-register-credit.component';
import { AuthRegisterProgramMembershipComponent } from './components/pages/auth-register-program-membership/auth-register-program-membership.component';
import { AuthRegisterTermsComponent } from './components/pages/auth-register-terms/auth-register-terms.component';
import { AuthRegisterComponent } from './components/pages/auth-register/auth-register.component';
import { AuthSelectComponent } from './components/pages/auth-select/auth-select.component';
import { AuthSigninComponent } from './components/pages/auth-signin/auth-signin.component';
import { AuthSignoutComponent } from './components/pages/auth-signout/auth-signout.component';


const routes: Routes = [
  {
    path: '',
    component: AuthBaseComponent,
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
  },
  {
    path: '',
    component: BaseComponent,
    children: [
      { path: 'logout', component: AuthLogoutComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
