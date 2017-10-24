/**
 * NgModule
 */
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { MomentModule } from 'angular2-moment';
import { QRCodeModule } from 'angular2-qrcode';
import { SwiperModule } from 'angular2-useful-swiper';

import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './component/about/about.component';
import { AppComponent } from './component/app/app.component';
import { BaseComponent } from './component/base/base.component';
import { ErrorComponent } from './component/error/error.component';
import { HeaderMenuComponent } from './component/header-menu/header-menu.component';
import { HeaderComponent } from './component/header/header.component';
import { LawComponent } from './component/law/law.component';
import { LoadingComponent } from './component/loading/loading.component';
import { LogoutComponent } from './component/logout/logout.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { PolicyComponent } from './component/policy/policy.component';
import { PrivacyComponent } from './component/privacy/privacy.component';
import { ChronologicalOrderComponent } from './component/purchase/chronological-order/chronological-order.component';
import { FilmOrderPerformanceComponent } from './component/purchase/film-order-performance/film-order-performance.component';
import { FilmOrderComponent } from './component/purchase/film-order/film-order.component';
import { ScheduleComponent } from './component/purchase/schedule/schedule.component';
import { NoTicketComponent } from './component/ticket/no-ticket/no-ticket.component';
import { TicketHolderComponent } from './component/ticket/ticket-holder/ticket-holder.component';
import { TicketComponent } from './component/ticket/ticket/ticket.component';
import { WalkThroughComponent } from './component/walk-through/walk-through.component';
import { AvailabilityPipe } from './pipe/availability/availability.pipe';
import { DurationPipe } from './pipe/duration/duration.pipe';
import { TimeFormatPipe } from './pipe/time-format/time-format.pipe';
import { AuthGuardService } from './service/auth-guard/auth-guard.service';
import { AwsCognitoService } from './service/aws-cognito/aws-cognito.service';
import { PurchaseService } from './service/purchase/purchase.service';

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
    PolicyComponent,
    LawComponent,
    PrivacyComponent,
    LogoutComponent,
    HeaderMenuComponent,
    ErrorComponent,
    FilmOrderPerformanceComponent
  ],
  imports: [
    BrowserModule,
    JsonpModule,
    MomentModule,
    SwiperModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    QRCodeModule
  ],
  providers: [
    AuthGuardService,
    PurchaseService,
    AwsCognitoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
