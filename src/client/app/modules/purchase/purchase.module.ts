import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PurchaseIndexComponent } from './components/pages/purchase-index/purchase-index.component';
import { PurchaseMoviePerformanceComponent } from './components/parts/purchase-movie-performance/purchase-movie-performance.component';
import { PurchaseMoveComponent } from './components/parts/purchase-movie/purchase-movie.component';
import { PurchaseTimePerformanceComponent } from './components/parts/purchase-time-performance/purchase-time-performance.component';
import { PurchaseTimeComponent } from './components/parts/purchase-time/purchase-time.component';
import { PurchaseRoutingModule } from './purchase-routing.module';

@NgModule({
    declarations: [
        PurchaseIndexComponent,
        PurchaseMoveComponent,
        PurchaseMoviePerformanceComponent,
        PurchaseTimeComponent,
        PurchaseTimePerformanceComponent,
    ],
    entryComponents: [],
    imports: [CommonModule, PurchaseRoutingModule, SharedModule],
    exports: [],
})
export class PurchaseModule {}
