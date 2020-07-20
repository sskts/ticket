import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieIndexComponent } from './pages/movie-index/movie-index.component';


@NgModule({
  declarations: [
    MovieIndexComponent
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    SharedModule,
  ]
})
export class MovieModule { }
