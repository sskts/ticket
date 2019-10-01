import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthLogoutComponent } from './components/pages/auth-logout/auth-logout.component';
import { AuthRegisterCreditComponent } from './components/pages/auth-register-credit/auth-register-credit.component';
import { AuthRegisterProgramMembershipComponent } from './components/pages/auth-register-program-membership/auth-register-program-membership.component';
import { AuthRegisterTermsComponent } from './components/pages/auth-register-terms/auth-register-terms.component';
import { AuthRegisterComponent } from './components/pages/auth-register/auth-register.component';
import { AuthSelectComponent } from './components/pages/auth-select/auth-select.component';
import { AuthSigninComponent } from './components/pages/auth-signin/auth-signin.component';
import { AuthSignoutComponent } from './components/pages/auth-signout/auth-signout.component';



@NgModule({
  declarations: [
    AuthLogoutComponent,
    AuthRegisterComponent,
    AuthRegisterCreditComponent,
    AuthRegisterProgramMembershipComponent,
    AuthRegisterTermsComponent,
    AuthSelectComponent,
    AuthSigninComponent,
    AuthSignoutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
  ]
})
export class AuthModule { }
