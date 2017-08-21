import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { StartupComponent } from './components/startup/startup.component';
import { TicketHolderComponent } from './components/ticket-holder/ticket-holder.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SettingComponent } from './components/setting/setting.component';
import { MainComponent } from './components/main/main.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthRegisterComponent } from './components/auth-register/auth-register.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthConfirmComponent } from './components/auth-confirm/auth-confirm.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'ticket-holder', component: TicketHolderComponent },
      { path: 'purchase', component: PurchaseComponent },
      { path: 'setting', component: SettingComponent }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'register', component: AuthRegisterComponent },
      { path: 'login', component: AuthLoginComponent },
      { path: 'confirm', component: AuthConfirmComponent }
    ]
  },
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