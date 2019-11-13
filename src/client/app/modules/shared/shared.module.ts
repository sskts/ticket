import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { AboutComponent } from './components/pages/about/about.component';
import { BaseComponent } from './components/pages/base/base.component';
import { BenefitsComponent } from './components/pages/benefits/benefits.component';
import { LawComponent } from './components/pages/law/law.component';
import { PolicyComponent } from './components/pages/policy/policy.component';
import { PrivacyComponent } from './components/pages/privacy/privacy.component';
import { RootComponent } from './components/pages/root/root.component';
import { TutorialComponent } from './components/pages/tutorial/tutorial.component';
import { CampaignComponent } from './components/parts/campaign/campaign.component';
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
import { TicketNotFoundComponent } from './components/parts/ticket-not-found/ticket-not-found.component';
import { AvailabilityPipe, DateFormatPipe, DurationPipe, TimeFormatPipe } from './pipes';

const components = [
  AboutComponent,
  BaseComponent,
  BenefitsComponent,
  LawComponent,
  PolicyComponent,
  PrivacyComponent,
  RootComponent,
  TutorialComponent,
  HeaderComponent,
  HeaderMenuComponent,
  HeaderMenuMemberComponent,
  HeaderMenuNotMemberComponent,
  IconComponent,
  InformationComponent,
  LoadingComponent,
  MaintenanceComponent,
  MembershipBenefitsComponent,
  ModalComponent,
  NavigationComponent,
  PageComponent,
  TicketNotFoundComponent,
  CampaignComponent
];

const pipes = [
  AvailabilityPipe,
  DateFormatPipe,
  DurationPipe,
  TimeFormatPipe
];

@NgModule({
  declarations: [
    ...components,
    ...pipes
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SwiperModule,
  ],
  exports: [
    ...components,
    ...pipes,
    ReactiveFormsModule,
    FormsModule,
    SwiperModule,
  ],
  providers: []
})
export class SharedModule { }
