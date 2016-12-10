import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';

import { AppComponent } from './components/app/AppComponent';
import { IndexComponent } from './components/index/IndexComponent';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        IndexComponent,
        
    ],
    entryComponents: [
        IndexComponent
    ],
  //   providers: [
  //     HeroService
  //   ],
    bootstrap: [ AppComponent ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})

export class AppModule {
}

