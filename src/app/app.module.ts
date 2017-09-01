/**
 * NgModule
 */
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'angular2-moment';
import { QRCodeModule } from 'angular2-qrcode';
import { SwiperModule } from 'angular2-useful-swiper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { AuthConfirmComponent } from './components/auth-confirm/auth-confirm.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthRegisterComponent } from './components/auth-register/auth-register.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { SettingComponent } from './components/setting/setting.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { StartupComponent } from './components/startup/startup.component';
import { TicketHolderComponent } from './components/ticket-holder/ticket-holder.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { TimeFormatPipe } from './pipe/time-format/time-format.pipe';
import { AuthGuardService } from './service/auth-guard/auth-guard.service';
import { SasakiService } from './service/sasaki/sasaki.service';
import { TimeScheduleComponent } from './components/time-schedule/time-schedule.component';
import { FilmScheduleComponent } from './components/film-schedule/film-schedule.component';

// tslint:disable-next-line:no-stateless-class
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
    SettingComponent,
    MainComponent,
    AuthRegisterComponent,
    AuthLoginComponent,
    AuthConfirmComponent,
    SignInComponent,
    SignOutComponent,
    TimeFormatPipe,
    TimeScheduleComponent,
    FilmScheduleComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    MomentModule,
    SwiperModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    QRCodeModule
  ],
  providers: [
    SasakiService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
