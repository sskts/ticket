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
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignOutComponent } from './components/auth/sign-out/sign-out.component';
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
import { CognitoUtil } from './service/cognito/cognito.service';
import { SasakiService } from './service/sasaki/sasaki.service';
import { UserLoginService } from './service/user-login/user-login.service';
import { UserParametersService } from './service/user-parameters/user-parameters.service';
import { UserRegistrationService } from './service/user-registration/user-registration.service';
import { UserService } from './service/user/user.service';
import { ForgotPasswordResetComponent } from './components/auth/forgot-password-reset/forgot-password-reset.component';

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
    SignInComponent,
    SignOutComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    AuthBaseComponent,
    ConfirmRegistrationComponent,
    ForgotPasswordResetComponent
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
    CognitoUtil,
    UserLoginService,
    UserParametersService,
    UserRegistrationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
