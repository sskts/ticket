import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PurchaseIndexComponent } from './components/pages/purchase-index/purchase-index.component';
import { PurchasePerformanceFilmComponent } from './components/parts/purchase-performance-film/purchase-performance-film.component';
import { PurchasePerformanceTimeComponent } from './components/parts/purchase-performance-time/purchase-performance-time.component';
import { PurchaseRoutingModule } from './purchase-routing.module';


@NgModule({
  declarations: [
    PurchaseIndexComponent,
    PurchasePerformanceFilmComponent,
    PurchasePerformanceTimeComponent
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    SharedModule,
  ],
  exports: []
})
export class PurchaseModule { }
