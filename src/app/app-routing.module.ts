import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StartupComponent } from './components/startup/startup.component';
import { TicketHolderComponent } from './components/ticket-holder/ticket-holder.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SettingComponent } from './components/setting/setting.component';
import { MainComponent } from './components/main/main.component';
import { AuthRegisterComponent } from './components/auth-register/auth-register.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthConfirmComponent } from './components/auth-confirm/auth-confirm.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';

import { AuthGuardService } from './service/auth-guard/auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/ticket-holder', pathMatch: 'full' },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'ticket-holder', component: TicketHolderComponent },
      { path: 'purchase', component: PurchaseComponent },
      { path: 'setting', component: SettingComponent }
    ]
  },
  // {
  //   path: 'auth',
  //   children: [
  //     { path: 'register', component: AuthRegisterComponent },
  //     { path: 'login', component: AuthLoginComponent },
  //     { path: 'confirm', component: AuthConfirmComponent }
  //   ]
  // },
  { path: 'signIn', component: SignInComponent },
  { path: 'signOut', component: SignOutComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
