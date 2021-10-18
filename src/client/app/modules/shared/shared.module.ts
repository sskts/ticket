import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalModule, RatingModule } from 'ngx-bootstrap';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { AboutComponent } from './components/pages/about/about.component';
import { BaseComponent } from './components/pages/base/base.component';
import { BenefitsComponent } from './components/pages/benefits/benefits.component';
import { LawComponent } from './components/pages/law/law.component';
import { PolicyComponent } from './components/pages/policy/policy.component';
import { PrivacyComponent } from './components/pages/privacy/privacy.component';
import { RootComponent } from './components/pages/root/root.component';
import { TutorialComponent } from './components/pages/tutorial/tutorial.component';
import { AlertModalComponent } from './components/parts/alert-modal/alert-modal.component';
import { AppearPopupComponent } from './components/parts/appear-popup/appear-popup.component';
import { CampaignComponent } from './components/parts/campaign/campaign.component';
import { ConfirmModalComponent } from './components/parts/confirm-modal/confirm-modal.component';
import { ContentsComponent } from './components/parts/contents/contents.component';
import { HeaderMenuComponent } from './components/parts/header-menu/header-menu.component';
import { HeaderComponent } from './components/parts/header/header.component';
import { InformationModalComponent } from './components/parts/information-modal/information-modal.component';
import { InformationComponent } from './components/parts/information/information.component';
import { LoadingComponent } from './components/parts/loading/loading.component';
import { MaintenanceComponent } from './components/parts/maintenance/maintenance.component';
import { MembershipBenefitsComponent } from './components/parts/membership-benefits/membership-benefits.component';
import { MovieDetailModalComponent } from './components/parts/movie-detail-modal/movie-detail-modal.component';
import { NavigationComponent } from './components/parts/navigation/navigation.component';
import { CreditcardSecurityCodeModalComponent } from './components/parts/security-code-modal/security-code-modal.component';
import {
    AvailabilityPipe,
    DateFormatPipe,
    DurationPipe,
    TimeFormatPipe,
} from './pipes';

const components = [
    AboutComponent,
    BaseComponent,
    BenefitsComponent,
    ContentsComponent,
    LawComponent,
    PolicyComponent,
    PrivacyComponent,
    RootComponent,
    TutorialComponent,
    HeaderComponent,
    HeaderMenuComponent,
    InformationComponent,
    LoadingComponent,
    MaintenanceComponent,
    MembershipBenefitsComponent,
    NavigationComponent,
    CampaignComponent,
];

const entryComponents = [
    AlertModalComponent,
    ConfirmModalComponent,
    CreditcardSecurityCodeModalComponent,
    InformationModalComponent,
    MovieDetailModalComponent,
    AppearPopupComponent,
];

const pipes = [AvailabilityPipe, DateFormatPipe, DurationPipe, TimeFormatPipe];

@NgModule({
    declarations: [...components, ...entryComponents, ...pipes],
    entryComponents,
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        SwiperModule,
        ModalModule,
        RatingModule,
    ],
    exports: [
        ...components,
        ...entryComponents,
        ...pipes,
        ReactiveFormsModule,
        FormsModule,
        SwiperModule,
        ModalModule,
        RatingModule,
    ],
    providers: [],
})
export class SharedModule {}
