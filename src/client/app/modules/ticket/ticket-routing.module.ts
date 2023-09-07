import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketIndexComponent } from './pages/ticket-index/ticket-index.component';
import { TicketCloseComponent } from './pages/ticket-close/ticket-close.component';
import { statusGuardService } from '../../guards/status-guard.service';

const routes: Routes = [
    {
        path: '',
        canActivate: [statusGuardService],
        component: TicketIndexComponent,
    },
    { path: 'close', component: TicketCloseComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TicketRoutingModule {}
