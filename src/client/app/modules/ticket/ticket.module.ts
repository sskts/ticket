import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TicketIndexComponent } from './pages/ticket-index/ticket-index.component';
import { TicketDetailComponent } from './parts/ticket-detail/ticket-detail.component';
import { TicketRoutingModule } from './ticket-routing.module';


@NgModule({
  declarations: [
    TicketIndexComponent,
    TicketDetailComponent
  ],
  imports: [
    CommonModule,
    TicketRoutingModule,
    SharedModule,
  ]
})
export class TicketModule { }
