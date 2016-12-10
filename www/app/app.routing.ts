import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/IndexComponent';

const appRoutes: Routes = [
    {
        path: '',
        component: IndexComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
