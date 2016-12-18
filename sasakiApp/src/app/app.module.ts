import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';

import { AppComponent } from './components/app/app.component';
import { IndexComponent } from './components/index/index.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { RegistInputComponent } from './components/regist-input/regist-input.component';
import { RegistConfirmComponent } from './components/regist-confirm/regist-confirm.component';
import { RegistPasswordComponent } from './components/regist-password/regist-password.component';
import { RegistCompleteComponent } from './components/regist-complete/regist-complete.component';
import { PerformanceComponent } from './components/performance/performance.component';
import { MyPageComponent } from './components/my-page/my-page.component';
import { HeaderComponent } from './components/header/header.component';
import { NaviComponent } from './components/navi/navi.component';
import { RedirectComponent } from './components/redirect/redirect.component';


@NgModule({
  declarations: [
    IndexComponent,
    AppComponent,
    AuthComponent,
    AuthLoginComponent,
    RegistInputComponent,
    RegistConfirmComponent,
    RegistPasswordComponent,
    RegistCompleteComponent,
    PerformanceComponent,
    MyPageComponent,
    HeaderComponent,
    NaviComponent,
    RedirectComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
