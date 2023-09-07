import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MemberBenefitsComponent } from './components/pages/member-benefits/member-benefits.component';
import { MemberEditCreditComponent } from './components/pages/member-edit-credit/member-edit-credit.component';
import { MemberEditProfileComponent } from './components/pages/member-edit-profile/member-edit-profile.component';
import { MemberEditComponent } from './components/pages/member-edit/member-edit.component';
import { MemberMypageComponent } from './components/pages/member-mypage/member-mypage.component';
import { MemberPointHistoryComponent } from './components/pages/member-point-history/member-point-history.component';
import { MemberTicketHistoryComponent } from './components/pages/member-ticket-history/member-ticket-history.component';
import { MemberTransferComponent } from './components/pages/member-transfer/member-transfer.component';
import { MemberWithdrawComponent } from './components/pages/member-withdraw/member-withdraw.component';
import { PointHistoryListComponent } from './components/parts/point-history-list/point-history-list.component';
import { PointSliderComponent } from './components/parts/point-slider/point-slider.component';
import { PointStampsComponent } from './components/parts/point-stamps/point-stamps.component';
import { TicketHistoryDetailComponent } from './components/parts/ticket-history-detail/ticket-history-detail.component';
import { MemberRoutingModule } from './member-routing.module';
import { MemberMypageCloseComponent } from './components/pages/member-mypage-close/member-mypage-close.component';

@NgModule({
    declarations: [
        MemberBenefitsComponent,
        MemberEditComponent,
        MemberEditCreditComponent,
        MemberEditProfileComponent,
        MemberMypageComponent,
        MemberMypageCloseComponent,
        MemberPointHistoryComponent,
        MemberTicketHistoryComponent,
        MemberWithdrawComponent,
        MemberTransferComponent,
        PointHistoryListComponent,
        PointSliderComponent,
        PointStampsComponent,
        TicketHistoryDetailComponent,
    ],
    entryComponents: [],
    imports: [CommonModule, MemberRoutingModule, SharedModule],
})
export class MemberModule {}
