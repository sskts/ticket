import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


const routes: Routes = [
  { path: 'error/:redirect', component: ErrorComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
