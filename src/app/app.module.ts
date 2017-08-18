import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'angular2-moment';
import { SwiperModule } from 'angular2-useful-swiper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { TicketHolderComponent } from './components/ticket-holder/ticket-holder.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { StartupComponent } from './components/startup/startup.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SettingComponent } from './components/setting/setting.component';

@NgModule({
  declarations: [
    AppComponent,
    TicketHolderComponent,
    TicketComponent,
    StartupComponent,
    NavigationComponent,
    HeaderComponent,
    PurchaseComponent,
    NotFoundComponent,
    SettingComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    MomentModule,
    SwiperModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
