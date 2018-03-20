/**
 * NgModule
 */

// tslint:disable-next-line:no-submodule-imports
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MomentModule } from 'angular2-moment';
import { SwiperModule } from 'angular2-useful-swiper';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './components/about/about.component';
import { AppComponent } from './components/app/app.component';
import { BaseComponent } from './components/base/base.component';
import { ErrorComponent } from './components/error/error.component';
import { HeaderComponent } from './components/parts/header/header.component';
import { LawComponent } from './components/law/law.component';
import { LoadingComponent } from './components/parts/loading/loading.component';
import { NavigationComponent } from './components/parts/navigation/navigation.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PolicyComponent } from './components/policy/policy.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { WalkThroughComponent } from './components/walk-through/walk-through.component';
import { AvailabilityPipe } from './pipes/availability/availability.pipe';
import { DurationPipe } from './pipes/duration/duration.pipe';
import { TimeFormatPipe } from './pipes/time-format/time-format.pipe';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { AwsCognitoService } from './services/aws-cognito/aws-cognito.service';
import { CallNativeService } from './services/call-native/call-native.service';
import { ReservationService } from './services/reservation/reservation.service';
import { ScheduleService } from './services/schedule/schedule.service';
import { SelectService } from './services/select/select.service';
import { StorageService } from './services/storage/storage.service';
import { HeaderMenuComponent } from './components/parts/header-menu/header-menu.component';
import { TicketNotFoundComponent } from './components/parts/ticket-not-found/ticket-not-found.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { PurchasePerformanceComponent } from './components/parts/purchase-performance/purchase-performance.component';
import { TicketDetailComponent } from './components/parts/ticket-detail/ticket-detail.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { SasakiService } from './services/sasaki/sasaki.service';

// tslint:disable-next-line:no-stateless-class
@NgModule({
  declarations: [
    AppComponent,
    WalkThroughComponent,
    NavigationComponent,
    HeaderComponent,
    NotFoundComponent,
    BaseComponent,
    TimeFormatPipe,
    AvailabilityPipe,
    DurationPipe,
    AboutComponent,
    LoadingComponent,
    PolicyComponent,
    LawComponent,
    PrivacyComponent,
    ErrorComponent,
    TicketDetailComponent,
    TicketNotFoundComponent,
    PurchaseComponent,
    PurchasePerformanceComponent,
    HeaderMenuComponent,
    TicketComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MomentModule,
    SwiperModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthGuardService,
    AwsCognitoService,
    ReservationService,
    ScheduleService,
    SelectService,
    StorageService,
    CallNativeService,
    SasakiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
