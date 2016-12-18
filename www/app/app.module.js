"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const platform_browser_1 = require('@angular/platform-browser');
const core_1 = require('@angular/core');
const forms_1 = require('@angular/forms');
const http_1 = require('@angular/http');
const app_routing_1 = require('./app.routing');
const app_component_1 = require('./components/app/app.component');
const index_component_1 = require('./components/index/index.component');
const auth_component_1 = require('./components/auth/auth.component');
const auth_login_component_1 = require('./components/auth-login/auth-login.component');
const regist_input_component_1 = require('./components/regist-input/regist-input.component');
const regist_confirm_component_1 = require('./components/regist-confirm/regist-confirm.component');
const regist_password_component_1 = require('./components/regist-password/regist-password.component');
const regist_complete_component_1 = require('./components/regist-complete/regist-complete.component');
const performance_component_1 = require('./components/performance/performance.component');
const my_page_component_1 = require('./components/my-page/my-page.component');
const header_component_1 = require('./components/header/header.component');
const navi_component_1 = require('./components/navi/navi.component');
const redirect_component_1 = require('./components/redirect/redirect.component');
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            index_component_1.IndexComponent,
            app_component_1.AppComponent,
            auth_component_1.AuthComponent,
            auth_login_component_1.AuthLoginComponent,
            regist_input_component_1.RegistInputComponent,
            regist_confirm_component_1.RegistConfirmComponent,
            regist_password_component_1.RegistPasswordComponent,
            regist_complete_component_1.RegistCompleteComponent,
            performance_component_1.PerformanceComponent,
            my_page_component_1.MyPageComponent,
            header_component_1.HeaderComponent,
            navi_component_1.NaviComponent,
            redirect_component_1.RedirectComponent,
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpModule,
            app_routing_1.routing
        ],
        providers: [],
        bootstrap: [app_component_1.AppComponent],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
    }), 
    __metadata('design:paramtypes', [])
], AppModule);
exports.AppModule = AppModule;
