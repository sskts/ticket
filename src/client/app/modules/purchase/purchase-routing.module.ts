import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseIndexComponent } from './components/pages/purchase-index/purchase-index.component';


const routes: Routes = [
  { path: '', component: PurchaseIndexComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
