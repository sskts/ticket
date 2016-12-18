import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RedirectComponent } from './components/redirect/redirect.component';
import { IndexComponent } from './components/index/index.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { RegistInputComponent } from './components/regist-input/regist-input.component';
import { RegistConfirmComponent } from './components/regist-confirm/regist-confirm.component';
import { RegistPasswordComponent } from './components/regist-password/regist-password.component';
import { RegistCompleteComponent } from './components/regist-complete/regist-complete.component';
import { PerformanceComponent } from './components/performance/performance.component';
import { MyPageComponent } from './components/my-page/my-page.component';

const appRoutes: Routes = [
    {
        path: '',
        component: RedirectComponent,
        
    },
    {
        path: 'index',
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
    },
    {
        path: 'myPage',
        component: MyPageComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
