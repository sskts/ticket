/**
 * NgModule
 */

// tslint:disable:no-submodule-imports max-line-length
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MomentModule } from 'angular2-moment';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { AboutComponent } from './components/pages/about/about.component';
import { AuthLogoutComponent } from './components/pages/auth/auth-logout/auth-logout.component';
import { AuthRegisterCreditComponent } from './components/pages/auth/auth-register-credit/auth-register-credit.component';
import { AuthRegisterProgramMembershipComponent } from './components/pages/auth/auth-register-program-membership/auth-register-program-membership.component';
import { AuthRegisterTermsComponent } from './components/pages/auth/auth-register-terms/auth-register-terms.component';
import { AuthRegisterComponent } from './components/pages/auth/auth-register/auth-register.component';
import { AuthSelectComponent } from './components/pages/auth/auth-select/auth-select.component';
import { AuthSigninComponent } from './components/pages/auth/auth-signin/auth-signin.component';
import { AuthSignoutComponent } from './components/pages/auth/auth-signout/auth-signout.component';
import { BaseComponent } from './components/pages/base/base.component';
import { BenefitsComponent } from './components/pages/benefits/benefits.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { LawComponent } from './components/pages/law/law.component';
import { MemberBenefitsComponent } from './components/pages/member/member-benefits/member-benefits.component';
import { MemberEditCreditComponent } from './components/pages/member/member-edit-credit/member-edit-credit.component';
import { MemberEditProfileComponent } from './components/pages/member/member-edit-profile/member-edit-profile.component';
import { MemberEditComponent } from './components/pages/member/member-edit/member-edit.component';
import { MemberMypageComponent } from './components/pages/member/member-mypage/member-mypage.component';
import { MemberPointHistoryComponent } from './components/pages/member/member-point-history/member-point-history.component';
import { MemberPointComponent } from './components/pages/member/member-point/member-point.component';
import { MemberWithdrawComponent } from './components/pages/member/member-withdraw/member-withdraw.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { PolicyComponent } from './components/pages/policy/policy.component';
import { PrivacyComponent } from './components/pages/privacy/privacy.component';
import { PurchaseComponent } from './components/pages/purchase/purchase.component';
import { RootComponent } from './components/pages/root/root.component';
import { TicketComponent } from './components/pages/ticket/ticket.component';
import { TutorialComponent } from './components/pages/tutorial/tutorial.component';
import { HeaderMenuMemberComponent } from './components/parts/header-menu-member/header-menu-member.component';
import { HeaderMenuNotMemberComponent } from './components/parts/header-menu-not-member/header-menu-not-member.component';
import { HeaderMenuComponent } from './components/parts/header-menu/header-menu.component';
import { HeaderComponent } from './components/parts/header/header.component';
import { IconComponent } from './components/parts/icon/icon.component';
import { InformationComponent } from './components/parts/information/information.component';
import { LoadingComponent } from './components/parts/loading/loading.component';
import { MaintenanceComponent } from './components/parts/maintenance/maintenance.component';
import { MembershipBenefitsComponent } from './components/parts/membership-benefits/membership-benefits.component';
import { ModalComponent } from './components/parts/modal/modal.component';
import { NavigationComponent } from './components/parts/navigation/navigation.component';
import { PageComponent } from './components/parts/page/page.component';
import { PointHistoryListComponent } from './components/parts/point-history-list/point-history-list.component';
import { PointSliderComponent } from './components/parts/point-slider/point-slider.component';
import { PointStampsComponent } from './components/parts/point-stamps/point-stamps.component';
import { PurchasePerformanceFilmComponent } from './components/parts/purchase-performance-film/purchase-performance-film.component';
import { PurchasePerformanceTimeComponent } from './components/parts/purchase-performance-time/purchase-performance-time.component';
import { TicketDetailComponent } from './components/parts/ticket-detail/ticket-detail.component';
import { TicketNotFoundComponent } from './components/parts/ticket-not-found/ticket-not-found.component';
import { AvailabilityPipe } from './pipes/availability/availability.pipe';
import { DateFormatPipe } from './pipes/date-format/date-format.pipe';
import { DurationPipe } from './pipes/duration/duration.pipe';
import { TimeFormatPipe } from './pipes/time-format/time-format.pipe';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { AwsCognitoService } from './services/aws-cognito/aws-cognito.service';
import { CallNativeService } from './services/call-native/call-native.service';
import { CreditGuardService } from './services/credit-guard/credit-guard.service';
import { MaintenanceService } from './services/maintenance/maintenance.service';
import { MemberGuardService } from './services/member-guard/member-guard.service';
import { MemberService } from './services/member/member.service';
import { ProgramMembershipGuardService } from './services/program-membership-guard/program-membership-guard.service';
import { ReservationService } from './services/reservation/reservation.service';
import { SasakiService } from './services/sasaki/sasaki.service';
import { SelectService } from './services/select/select.service';
import { StorageService } from './services/storage/storage.service';
import { TutorialGuardService } from './services/tutorial-guard/tutorial-guard.service';
import { UserService } from './services/user/user.service';
import { UtilService } from './services/util/util.service';

// tslint:disable-next-line:no-stateless-class
@NgModule({
    declarations: [
        AppComponent,
        TutorialComponent,
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
        HeaderMenuComponent,
        TicketComponent,
        AuthSelectComponent,
        AuthLogoutComponent,
        MemberBenefitsComponent,
        MemberEditComponent,
        MemberWithdrawComponent,
        MemberPointComponent,
        MemberPointHistoryComponent,
        MemberMypageComponent,
        PurchasePerformanceTimeComponent,
        PurchasePerformanceFilmComponent,
        IconComponent,
        AuthSigninComponent,
        AuthSignoutComponent,
        MemberEditCreditComponent,
        ModalComponent,
        MemberEditProfileComponent,
        RootComponent,
        AuthRegisterTermsComponent,
        AuthRegisterComponent,
        MembershipBenefitsComponent,
        PointSliderComponent,
        PointStampsComponent,
        BenefitsComponent,
        DateFormatPipe,
        AuthRegisterCreditComponent,
        AuthRegisterProgramMembershipComponent,
        HeaderMenuMemberComponent,
        HeaderMenuNotMemberComponent,
        InformationComponent,
        PageComponent,
        PointHistoryListComponent,
        MaintenanceComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        MomentModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        SwiperModule
    ],
    providers: [
        AuthGuardService,
        AwsCognitoService,
        ReservationService,
        SelectService,
        StorageService,
        CallNativeService,
        UserService,
        SasakiService,
        MemberGuardService,
        CreditGuardService,
        ProgramMembershipGuardService,
        MemberService,
        TutorialGuardService,
        UtilService,
        MaintenanceService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
