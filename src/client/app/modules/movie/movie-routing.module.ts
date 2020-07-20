import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieIndexComponent } from './pages/movie-index/movie-index.component';


const routes: Routes = [
  { path: '', component: MovieIndexComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
