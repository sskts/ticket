import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/pages/index/IndexComponent';
import { AuthComponent } from './components/pages/auth/AuthComponent';
import { AuthLoginComponent } from './components/pages/auth/login/AuthLoginComponent';
import { RegistInputComponent } from './components/pages/regist/RegistInputComponent';
import { RegistConfirmComponent } from './components/pages/regist/RegistConfirmComponent';
import { RegistPasswordComponent } from './components/pages/regist/RegistPasswordComponent';
import { RegistCompleteComponent } from './components/pages/regist/RegistCompleteComponent';
import { PerformanceComponent } from './components/pages/performance/PerformanceComponent';

const appRoutes: Routes = [
    {
        path: '',
        component: IndexComponent,
        
    },
    {
        path: 'auth',
        component: AuthComponent
    },
    {
        path: 'auth/login',
        component: AuthLoginComponent
    },
    {
        path: 'regist/input',
        component: RegistInputComponent
    },
    {
        path: 'regist/confirm',
        component: RegistConfirmComponent
    },
    {
        path: 'regist/password',
        component: RegistPasswordComponent
    },
    {
        path: 'regist/complete',
        component: RegistCompleteComponent
    },
    {
        path: 'performance',
        component: PerformanceComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
