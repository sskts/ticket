import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieIndexComponent } from './pages/movie-index/movie-index.component';
import { MovieCloseComponent } from './pages/movie-close/movie-close.component';
import { statusGuardService } from '../../guards/status-guard.service';

const routes: Routes = [
    {
        path: '',
        canActivate: [statusGuardService],
        component: MovieIndexComponent,
    },
    { path: 'close', component: MovieCloseComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MovieRoutingModule {}
