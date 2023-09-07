import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieIndexComponent } from './pages/movie-index/movie-index.component';
import { MovieCloseComponent } from './pages/movie-close/movie-close.component';

@NgModule({
    declarations: [MovieIndexComponent, MovieCloseComponent],
    imports: [CommonModule, MovieRoutingModule, SharedModule],
})
export class MovieModule {}
