import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StartupComponent } from './components/startup/startup.component';
import { TicketHolderComponent } from './components/ticket-holder/ticket-holder.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SettingComponent } from './components/setting/setting.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/ticket-holder', pathMatch: 'full' },
  { path: 'ticket-holder', component: TicketHolderComponent },
  { path: 'purchase', component: PurchaseComponent },
  { path: 'setting', component: SettingComponent },
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