import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TicketIndexComponent } from './pages/ticket-index/ticket-index.component';
import { TicketDetailComponent } from './parts/ticket-detail/ticket-detail.component';
import { TicketNotFoundComponent } from './parts/ticket-not-found/ticket-not-found.component';
import { TicketRoutingModule } from './ticket-routing.module';
import { TicketCloseComponent } from './pages/ticket-close/ticket-close.component';

@NgModule({
    declarations: [
        TicketIndexComponent,
        TicketCloseComponent,
        TicketDetailComponent,
        TicketNotFoundComponent,
    ],
    imports: [CommonModule, TicketRoutingModule, SharedModule],
})
export class TicketModule {}
