/**
 * ルーティング
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { SettingComponent } from './components/setting/setting.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { TicketHolderComponent } from './components/ticket-holder/ticket-holder.component';
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
  {
    path: 'auth',
    children: [
      { path: 'login', component: AuthLoginComponent },
      // { path: 'register', component: AuthRegisterComponent },
      // { path: 'confirm', component: AuthConfirmComponent }
    ]
  },
  { path: 'signIn', component: SignInComponent },
  { path: 'signOut', component: SignOutComponent },
  { path: '**', component: NotFoundComponent }
];

// tslint:disable-next-line:no-stateless-class
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
