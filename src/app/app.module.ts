/**
 * NgModule
 */
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MomentModule } from 'angular2-moment';
import { QRCodeModule } from 'angular2-qrcode';
import { SwiperModule } from 'angular2-useful-swiper';

import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './components/about/about.component';
import { AppComponent } from './components/app/app.component';
import { AuthBaseComponent } from './components/auth/auth-base/auth-base.component';
import { AuthIndexComponent } from './components/auth/auth-index/auth-index.component';
import { ConfirmRegistrationComponent } from './components/auth/confirm-registration/confirm-registration.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { BaseComponent } from './components/base/base.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { LawComponent } from './components/law/law.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PolicyComponent } from './components/policy/policy.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChronologicalOrderComponent } from './components/purchase/chronological-order/chronological-order.component';
import { FilmOrderComponent } from './components/purchase/film-order/film-order.component';
import { ScheduleComponent } from './components/purchase/schedule/schedule.component';
import { NoTicketComponent } from './components/ticket/no-ticket/no-ticket.component';
import { TicketHolderComponent } from './components/ticket/ticket-holder/ticket-holder.component';
import { TicketComponent } from './components/ticket/ticket/ticket.component';
import { WalkThroughComponent } from './components/walk-through/walk-through.component';
import { AvailabilityPipe } from './pipe/availability/availability.pipe';
import { DurationPipe } from './pipe/duration/duration.pipe';
import { TimeFormatPipe } from './pipe/time-format/time-format.pipe';
import { AuthGuardService } from './service/auth-guard/auth-guard.service';
import { AwsCognitoService } from './service/aws-cognito/aws-cognito.service';
import { SasakiService } from './service/sasaki/sasaki.service';
import { UserService } from './service/user/user.service';
import { ErrorComponent } from './components/error/error.component';

// tslint:disable-next-line:no-stateless-class
@NgModule({
  declarations: [
    AppComponent,
    TicketHolderComponent,
    TicketComponent,
    WalkThroughComponent,
    NavigationComponent,
    HeaderComponent,
    ScheduleComponent,
    NotFoundComponent,
    BaseComponent,
    TimeFormatPipe,
    ChronologicalOrderComponent,
    FilmOrderComponent,
    AvailabilityPipe,
    DurationPipe,
    NoTicketComponent,
    AboutComponent,
    LoadingComponent,
    ProfileComponent,
    PolicyComponent,
    LawComponent,
    PrivacyComponent,
    LogoutComponent,
    HeaderMenuComponent,
    AuthIndexComponent,
    SignUpComponent,
    AuthBaseComponent,
    ConfirmRegistrationComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    MomentModule,
    SwiperModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    QRCodeModule
  ],
  providers: [
    SasakiService,
    AuthGuardService,
    UserService,
    AwsCognitoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
