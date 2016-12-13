import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';

import { AppComponent } from './components/app/AppComponent';
import { BaseComponent } from './components/BaseComponent';
import { PageComponent } from './components/pages/PageComponent';
import { IndexComponent } from './components/pages/index/IndexComponent';
import { AuthComponent } from './components/pages/auth/AuthComponent';
import { AuthLoginComponent } from './components/pages/auth/login/AuthLoginComponent';
import { RegistInputComponent } from './components/pages/regist/RegistInputComponent';
import { RegistConfirmComponent } from './components/pages/regist/RegistConfirmComponent';
import { RegistPasswordComponent } from './components/pages/regist/RegistPasswordComponent';
import { RegistCompleteComponent } from './components/pages/regist/RegistCompleteComponent';

import { headerComponent } from './components/partials/header/headerComponent';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        BaseComponent,
        PageComponent,
        IndexComponent,
        AuthComponent,
        AuthLoginComponent,
        RegistInputComponent,
        RegistConfirmComponent,
        RegistPasswordComponent,
        RegistCompleteComponent,

        headerComponent,

    ],
    entryComponents: [
        BaseComponent,
        PageComponent,
        IndexComponent,
        AuthComponent,
        AuthLoginComponent,
        RegistInputComponent,
        RegistConfirmComponent,
        RegistPasswordComponent,
        RegistCompleteComponent,

        headerComponent,
    ],
    //   providers: [
    //     HeroService
    //   ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {
}

