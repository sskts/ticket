import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketIndexComponent } from './pages/ticket-index/ticket-index.component';


const routes: Routes = [
  { path: '', component: TicketIndexComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
