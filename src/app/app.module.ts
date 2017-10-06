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
import { AuthBaseComponent } from './components/auth-base/auth-base.component';
import { AuthComponent } from './components/auth/auth.component';
import { BaseComponent } from './components/base/base.component';
import {
  ChronologicalOrderOfPerformanceComponent
} from './components/chronological-order-of-performance/chronological-order-of-performance.component';
import { FilmOrderOfPerformanceComponent } from './components/film-order-of-performance/film-order-of-performance.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { LawComponent } from './components/law/law.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NoTicketComponent } from './components/no-ticket/no-ticket.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PolicyComponent } from './components/policy/policy.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TicketHolderComponent } from './components/ticket-holder/ticket-holder.component';
import { TicketComponent } from './components/ticket/ticket.component';
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

// tslint:disable-next-line:no-stateless-class
@NgModule({
  declarations: [
    AppComponent,
    TicketHolderComponent,
    TicketComponent,
    WalkThroughComponent,
    NavigationComponent,
    HeaderComponent,
    PurchaseComponent,
    NotFoundComponent,
    BaseComponent,
    TimeFormatPipe,
    ChronologicalOrderOfPerformanceComponent,
    FilmOrderOfPerformanceComponent,
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
    AuthComponent,
    SignInComponent,
    SignOutComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    AuthBaseComponent
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
