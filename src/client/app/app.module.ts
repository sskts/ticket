/**
 * NgModule
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule, RatingModule } from 'ngx-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { CoreModule } from './modules/core/core.module';
import { ErrorModule } from './modules/error/error.module';
import { SharedModule } from './modules/shared/shared.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        SharedModule,
        ErrorModule,
        AppRoutingModule,
        RatingModule.forRoot(),
        ModalModule.forRoot(),

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
