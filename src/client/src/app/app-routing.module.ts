/**
 * ルーティング
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import * as auth from './routes/auth.route';
import * as common from './routes/common.route';
import * as member from './routes/member.route';

const appRoutes: Routes = [
    { path: '', redirectTo: '/root', pathMatch: 'full' },
    common.rootRoute,
    common.route,
    auth.route,
    auth.logoutRoute,
    member.route,
    { path: 'tutorial', component: TutorialComponent },
    { path: 'error/:redirect', component: ErrorComponent },
    { path: 'error', component: ErrorComponent },
    { path: '**', component: NotFoundComponent }
];

// tslint:disable-next-line:no-stateless-class
@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { useHash: true, enableTracing: true }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
