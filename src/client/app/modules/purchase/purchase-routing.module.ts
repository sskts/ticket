import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseIndexComponent } from './components/pages/purchase-index/purchase-index.component';
import { PurchaseCloseComponent } from './components/pages/purchase-close/purchase-close.component';
import { statusGuardService } from '../../guards/status-guard.service';

const routes: Routes = [
    {
        path: '',
        canActivate: [statusGuardService],
        component: PurchaseIndexComponent,
    },
    { path: 'close', component: PurchaseCloseComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PurchaseRoutingModule {}
