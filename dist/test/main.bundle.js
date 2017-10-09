webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_about_about_component__ = __webpack_require__("../../../../../src/app/components/about/about.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_auth_auth_base_auth_base_component__ = __webpack_require__("../../../../../src/app/components/auth/auth-base/auth-base.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_auth_auth_index_auth_index_component__ = __webpack_require__("../../../../../src/app/components/auth/auth-index/auth-index.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_auth_forgot_password_forgot_password_component__ = __webpack_require__("../../../../../src/app/components/auth/forgot-password/forgot-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_auth_sign_in_sign_in_component__ = __webpack_require__("../../../../../src/app/components/auth/sign-in/sign-in.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_auth_sign_up_sign_up_component__ = __webpack_require__("../../../../../src/app/components/auth/sign-up/sign-up.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_base_base_component__ = __webpack_require__("../../../../../src/app/components/base/base.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_law_law_component__ = __webpack_require__("../../../../../src/app/components/law/law.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_not_found_not_found_component__ = __webpack_require__("../../../../../src/app/components/not-found/not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_policy_policy_component__ = __webpack_require__("../../../../../src/app/components/policy/policy.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_privacy_privacy_component__ = __webpack_require__("../../../../../src/app/components/privacy/privacy.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_profile_profile_component__ = __webpack_require__("../../../../../src/app/components/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_purchase_schedule_schedule_component__ = __webpack_require__("../../../../../src/app/components/purchase/schedule/schedule.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_ticket_ticket_holder_ticket_holder_component__ = __webpack_require__("../../../../../src/app/components/ticket/ticket-holder/ticket-holder.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_walk_through_walk_through_component__ = __webpack_require__("../../../../../src/app/components/walk-through/walk-through.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__service_auth_guard_auth_guard_service__ = __webpack_require__("../../../../../src/app/service/auth-guard/auth-guard.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * ルーティング
 */


















var appRoutes = [
    { path: '', redirectTo: '/ticket', pathMatch: 'full' },
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_8__components_base_base_component__["a" /* BaseComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_17__service_auth_guard_auth_guard_service__["a" /* AuthGuardService */]],
        children: [
            { path: 'ticket', component: __WEBPACK_IMPORTED_MODULE_15__components_ticket_ticket_holder_ticket_holder_component__["a" /* TicketHolderComponent */] },
            { path: 'purchase', component: __WEBPACK_IMPORTED_MODULE_14__components_purchase_schedule_schedule_component__["a" /* ScheduleComponent */] },
            { path: 'about', component: __WEBPACK_IMPORTED_MODULE_2__components_about_about_component__["a" /* AboutComponent */] },
            { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_13__components_profile_profile_component__["a" /* ProfileComponent */] },
            { path: 'policy', component: __WEBPACK_IMPORTED_MODULE_11__components_policy_policy_component__["a" /* PolicyComponent */] },
            { path: 'law', component: __WEBPACK_IMPORTED_MODULE_9__components_law_law_component__["a" /* LawComponent */] },
            { path: 'privacy', component: __WEBPACK_IMPORTED_MODULE_12__components_privacy_privacy_component__["a" /* PrivacyComponent */] }
        ]
    },
    { path: 'auth', component: __WEBPACK_IMPORTED_MODULE_4__components_auth_auth_index_auth_index_component__["a" /* AuthIndexComponent */] },
    {
        path: 'auth',
        component: __WEBPACK_IMPORTED_MODULE_3__components_auth_auth_base_auth_base_component__["a" /* AuthBaseComponent */],
        children: [
            { path: 'signIn', component: __WEBPACK_IMPORTED_MODULE_6__components_auth_sign_in_sign_in_component__["a" /* SignInComponent */] },
            { path: 'signUp', component: __WEBPACK_IMPORTED_MODULE_7__components_auth_sign_up_sign_up_component__["a" /* SignUpComponent */] },
            { path: 'forgotPassword', component: __WEBPACK_IMPORTED_MODULE_5__components_auth_forgot_password_forgot_password_component__["a" /* ForgotPasswordComponent */] },
            { path: 'walk-through', component: __WEBPACK_IMPORTED_MODULE_16__components_walk_through_walk_through_component__["a" /* WalkThroughComponent */] }
        ]
    },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_10__components_not_found_not_found_component__["a" /* NotFoundComponent */] }
];
// tslint:disable-next-line:no-stateless-class
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot(appRoutes, { useHash: true, enableTracing: true } // <-- debugging purposes only
                )
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]
            ]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_moment__ = __webpack_require__("../../../../angular2-moment/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_qrcode__ = __webpack_require__("../../../../angular2-qrcode/lib/angular2-qrcode.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_useful_swiper__ = __webpack_require__("../../../../angular2-useful-swiper/lib/swiper.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_useful_swiper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_useful_swiper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_about_about_component__ = __webpack_require__("../../../../../src/app/components/about/about.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_app_app_component__ = __webpack_require__("../../../../../src/app/components/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_auth_auth_base_auth_base_component__ = __webpack_require__("../../../../../src/app/components/auth/auth-base/auth-base.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_auth_auth_index_auth_index_component__ = __webpack_require__("../../../../../src/app/components/auth/auth-index/auth-index.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_auth_confirm_registration_confirm_registration_component__ = __webpack_require__("../../../../../src/app/components/auth/confirm-registration/confirm-registration.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_auth_forgot_password_forgot_password_component__ = __webpack_require__("../../../../../src/app/components/auth/forgot-password/forgot-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_auth_sign_in_sign_in_component__ = __webpack_require__("../../../../../src/app/components/auth/sign-in/sign-in.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_auth_sign_out_sign_out_component__ = __webpack_require__("../../../../../src/app/components/auth/sign-out/sign-out.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_auth_sign_up_sign_up_component__ = __webpack_require__("../../../../../src/app/components/auth/sign-up/sign-up.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_base_base_component__ = __webpack_require__("../../../../../src/app/components/base/base.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_header_menu_header_menu_component__ = __webpack_require__("../../../../../src/app/components/header-menu/header-menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_header_header_component__ = __webpack_require__("../../../../../src/app/components/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_law_law_component__ = __webpack_require__("../../../../../src/app/components/law/law.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_loading_loading_component__ = __webpack_require__("../../../../../src/app/components/loading/loading.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_logout_logout_component__ = __webpack_require__("../../../../../src/app/components/logout/logout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_navigation_navigation_component__ = __webpack_require__("../../../../../src/app/components/navigation/navigation.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_not_found_not_found_component__ = __webpack_require__("../../../../../src/app/components/not-found/not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_policy_policy_component__ = __webpack_require__("../../../../../src/app/components/policy/policy.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_privacy_privacy_component__ = __webpack_require__("../../../../../src/app/components/privacy/privacy.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_profile_profile_component__ = __webpack_require__("../../../../../src/app/components/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_purchase_chronological_order_chronological_order_component__ = __webpack_require__("../../../../../src/app/components/purchase/chronological-order/chronological-order.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__components_purchase_film_order_film_order_component__ = __webpack_require__("../../../../../src/app/components/purchase/film-order/film-order.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__components_purchase_schedule_schedule_component__ = __webpack_require__("../../../../../src/app/components/purchase/schedule/schedule.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__components_ticket_no_ticket_no_ticket_component__ = __webpack_require__("../../../../../src/app/components/ticket/no-ticket/no-ticket.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__components_ticket_ticket_holder_ticket_holder_component__ = __webpack_require__("../../../../../src/app/components/ticket/ticket-holder/ticket-holder.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__components_ticket_ticket_ticket_component__ = __webpack_require__("../../../../../src/app/components/ticket/ticket/ticket.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__components_walk_through_walk_through_component__ = __webpack_require__("../../../../../src/app/components/walk-through/walk-through.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pipe_availability_availability_pipe__ = __webpack_require__("../../../../../src/app/pipe/availability/availability.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pipe_duration_duration_pipe__ = __webpack_require__("../../../../../src/app/pipe/duration/duration.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pipe_time_format_time_format_pipe__ = __webpack_require__("../../../../../src/app/pipe/time-format/time-format.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__service_auth_guard_auth_guard_service__ = __webpack_require__("../../../../../src/app/service/auth-guard/auth-guard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__service_cognito_cognito_service__ = __webpack_require__("../../../../../src/app/service/cognito/cognito.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__service_sasaki_sasaki_service__ = __webpack_require__("../../../../../src/app/service/sasaki/sasaki.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__service_user_login_user_login_service__ = __webpack_require__("../../../../../src/app/service/user-login/user-login.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__service_user_parameters_user_parameters_service__ = __webpack_require__("../../../../../src/app/service/user-parameters/user-parameters.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__service_user_registration_user_registration_service__ = __webpack_require__("../../../../../src/app/service/user-registration/user-registration.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__service_user_user_service__ = __webpack_require__("../../../../../src/app/service/user/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * NgModule
 */












































// tslint:disable-next-line:no-stateless-class
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__components_app_app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_31__components_ticket_ticket_holder_ticket_holder_component__["a" /* TicketHolderComponent */],
                __WEBPACK_IMPORTED_MODULE_32__components_ticket_ticket_ticket_component__["a" /* TicketComponent */],
                __WEBPACK_IMPORTED_MODULE_33__components_walk_through_walk_through_component__["a" /* WalkThroughComponent */],
                __WEBPACK_IMPORTED_MODULE_22__components_navigation_navigation_component__["a" /* NavigationComponent */],
                __WEBPACK_IMPORTED_MODULE_18__components_header_header_component__["a" /* HeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_29__components_purchase_schedule_schedule_component__["a" /* ScheduleComponent */],
                __WEBPACK_IMPORTED_MODULE_23__components_not_found_not_found_component__["a" /* NotFoundComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_base_base_component__["a" /* BaseComponent */],
                __WEBPACK_IMPORTED_MODULE_36__pipe_time_format_time_format_pipe__["a" /* TimeFormatPipe */],
                __WEBPACK_IMPORTED_MODULE_27__components_purchase_chronological_order_chronological_order_component__["a" /* ChronologicalOrderComponent */],
                __WEBPACK_IMPORTED_MODULE_28__components_purchase_film_order_film_order_component__["a" /* FilmOrderComponent */],
                __WEBPACK_IMPORTED_MODULE_34__pipe_availability_availability_pipe__["a" /* AvailabilityPipe */],
                __WEBPACK_IMPORTED_MODULE_35__pipe_duration_duration_pipe__["a" /* DurationPipe */],
                __WEBPACK_IMPORTED_MODULE_30__components_ticket_no_ticket_no_ticket_component__["a" /* NoTicketComponent */],
                __WEBPACK_IMPORTED_MODULE_7__components_about_about_component__["a" /* AboutComponent */],
                __WEBPACK_IMPORTED_MODULE_20__components_loading_loading_component__["a" /* LoadingComponent */],
                __WEBPACK_IMPORTED_MODULE_26__components_profile_profile_component__["a" /* ProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_24__components_policy_policy_component__["a" /* PolicyComponent */],
                __WEBPACK_IMPORTED_MODULE_19__components_law_law_component__["a" /* LawComponent */],
                __WEBPACK_IMPORTED_MODULE_25__components_privacy_privacy_component__["a" /* PrivacyComponent */],
                __WEBPACK_IMPORTED_MODULE_21__components_logout_logout_component__["a" /* LogoutComponent */],
                __WEBPACK_IMPORTED_MODULE_17__components_header_menu_header_menu_component__["a" /* HeaderMenuComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_auth_auth_index_auth_index_component__["a" /* AuthIndexComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_auth_sign_in_sign_in_component__["a" /* SignInComponent */],
                __WEBPACK_IMPORTED_MODULE_14__components_auth_sign_out_sign_out_component__["a" /* SignOutComponent */],
                __WEBPACK_IMPORTED_MODULE_15__components_auth_sign_up_sign_up_component__["a" /* SignUpComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_auth_forgot_password_forgot_password_component__["a" /* ForgotPasswordComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_auth_auth_base_auth_base_component__["a" /* AuthBaseComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_auth_confirm_registration_confirm_registration_component__["a" /* ConfirmRegistrationComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3_angular2_moment__["MomentModule"],
                __WEBPACK_IMPORTED_MODULE_5_angular2_useful_swiper__["SwiperModule"],
                __WEBPACK_IMPORTED_MODULE_6__app_routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_4_angular2_qrcode__["a" /* QRCodeModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_39__service_sasaki_sasaki_service__["a" /* SasakiService */],
                __WEBPACK_IMPORTED_MODULE_37__service_auth_guard_auth_guard_service__["a" /* AuthGuardService */],
                __WEBPACK_IMPORTED_MODULE_43__service_user_user_service__["a" /* UserService */],
                __WEBPACK_IMPORTED_MODULE_38__service_cognito_cognito_service__["a" /* CognitoUtil */],
                __WEBPACK_IMPORTED_MODULE_40__service_user_login_user_login_service__["a" /* UserLoginService */],
                __WEBPACK_IMPORTED_MODULE_41__service_user_parameters_user_parameters_service__["a" /* UserParametersService */],
                __WEBPACK_IMPORTED_MODULE_42__service_user_registration_user_registration_service__["a" /* UserRegistrationService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_8__components_app_app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/components/about/about.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"contents bg-image-blue\">\n    <div class=\"inner\">\n        <p class=\"read mb-middle\">\n            このアプリはシネマサンシャイン公式のスマートフォンアプリです。<br>\n            このアプリを使うことで、アプリ会員価格でのチケット購入やチケットの保存機能などシネマサンシャインでの映画鑑賞をお得にお楽しみ頂けます。\n        </p>\n        <div class=\"mb-middle\">\n            <h2 class=\"mb-small text-center large-text\">アプリ会員価格でのチケット購入！</h2>\n            <p class=\"mb-middle text-center\">\n                通常のチケット購入価格よりお得な<br>アプリ会員価格でチケットが購入できます。\n            </p>\n            <div class=\"text-center\"><img src=\"/assets/images/about/discount.svg\" width=\"135\" height=\"103\"></div>\n        </div>\n        <div class=\"mb-middle\">\n            <h2 class=\"mb-small text-center large-text\">チケットをスマートに購入</h2>\n            <p class=\"mb-middle text-center\">\n                一度アプリ内でチケット購入を行うと、<br>次回から購入者情報やクレジットカード情報を<br>入力せずにご購入頂けます。\n            </p>\n            <div class=\"text-center\"><img src=\"/assets/images/about/buy.svg\" width=\"99\" height=\"171\"></div>\n        </div>\n        <div class=\"mb-middle\">\n            <h2 class=\"mb-small text-center large-text\">スマフォがそのままチケットに！</h2>\n            <p class=\"mb-middle text-center\">\n                鑑賞当日は、チケットホルダー内のQRコードを<br>見せるだけでスムーズにご入場頂けます。\n            </p>\n            <div class=\"text-center\"><img src=\"/assets/images/about/ticket.svg\" width=\"115\" height=\"131\"></div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/about/about.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/about/about.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * AboutComponent
 */

var AboutComponent = /** @class */ (function () {
    function AboutComponent() {
    }
    AboutComponent.prototype.ngOnInit = function () {
    };
    AboutComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-about',
            template: __webpack_require__("../../../../../src/app/components/about/about.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/about/about.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], AboutComponent);
    return AboutComponent;
}());

//# sourceMappingURL=about.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/app/components/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * AppComponent
 */

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () { };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/components/app/app.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/auth/auth-base/auth-base.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"icon-prev-white\" routerLink=\"/auth\"></div>\n<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/app/components/auth/auth-base/auth-base.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".icon-prev-white {\n  position: fixed;\n  top: 10px;\n  left: 10px;\n  z-index: 10; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/auth/auth-base/auth-base.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthBaseComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * AuthBaseComponent
 */

var AuthBaseComponent = /** @class */ (function () {
    function AuthBaseComponent() {
    }
    AuthBaseComponent.prototype.ngOnInit = function () {
    };
    AuthBaseComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-auth-base',
            template: __webpack_require__("../../../../../src/app/components/auth/auth-base/auth-base.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/auth/auth-base/auth-base.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], AuthBaseComponent);
    return AuthBaseComponent;
}());

//# sourceMappingURL=auth-base.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/auth/auth-index/auth-index.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"contents position-center\">\n    <div class=\"inner center\">\n        <div class=\"logo text-center mb-large\">\n            <img src=\"/assets/images/common/logo.svg\">\n        </div>\n        <p class=\"read text-center mb-middle\">初めてアプリをご利用なさる方は\n            <br>下のボタンから会員登録をおこなってください。</p>\n        <button class=\"btn btn-primary btn-block mb-large\" routerLink=\"/auth/walk-through\">アプリを初めてご利用の方</button>\n        <p class=\"read text-center mb-middle\">既に会員登録済みの方は\n            <br>下のボタンよりログインしてください。</p>\n        <button class=\"btn btn-info btn-block mb-small\" (click)=\"login()\">Amazon Cognito</button>\n        <button class=\"btn btn-info btn-block\" routerLink=\"/auth/signIn\">会員登録済みの方</button>\n    </div>\n</div>\n<app-loading *ngIf=\"isLoading\"></app-loading>"

/***/ }),

/***/ "../../../../../src/app/components/auth/auth-index/auth-index.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".inner {\n  padding: 0;\n  width: 300px; }\n\n.logo img {\n  width: 80px;\n  height: 49px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/auth/auth-index/auth-index.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthIndexComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_sasaki_sasaki_service__ = __webpack_require__("../../../../../src/app/service/sasaki/sasaki.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * AuthComponent
 */



var AuthIndexComponent = /** @class */ (function () {
    function AuthIndexComponent(sasaki, router) {
        this.sasaki = sasaki;
        this.router = router;
    }
    AuthIndexComponent.prototype.ngOnInit = function () {
        this.isLoading = false;
    };
    AuthIndexComponent.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.sasaki.auth.signIn()];
                    case 1:
                        result = _a.sent();
                        this.sasaki.credentials = result;
                        this.isLoading = true;
                        this.router.navigate(['/']);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        this.isLoading = false;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthIndexComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-auth-index',
            template: __webpack_require__("../../../../../src/app/components/auth/auth-index/auth-index.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/auth/auth-index/auth-index.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__service_sasaki_sasaki_service__["a" /* SasakiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_sasaki_sasaki_service__["a" /* SasakiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
    ], AuthIndexComponent);
    return AuthIndexComponent;
    var _a, _b;
}());

//# sourceMappingURL=auth-index.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/auth/confirm-registration/confirm-registration.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  confirm-registration works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/components/auth/confirm-registration/confirm-registration.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/auth/confirm-registration/confirm-registration.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmRegistrationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ConfirmRegistrationComponent = /** @class */ (function () {
    function ConfirmRegistrationComponent() {
    }
    ConfirmRegistrationComponent.prototype.ngOnInit = function () {
    };
    ConfirmRegistrationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-confirm-registration',
            template: __webpack_require__("../../../../../src/app/components/auth/confirm-registration/confirm-registration.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/auth/confirm-registration/confirm-registration.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ConfirmRegistrationComponent);
    return ConfirmRegistrationComponent;
}());

//# sourceMappingURL=confirm-registration.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/auth/forgot-password/forgot-password.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"contents position-center\">\n    <div class=\"inner center\">\n        <form [formGroup]=\"forgotPasswordForm\" (ngSubmit)=\"resetPassword()\">\n            <div class=\"mb-small\">\n                <label class=\"control-label small-text\">ユーザー</label>\n                <input type=\"text\" class=\"form-control\" name=\"user\" [formControl]=\"forgotPasswordForm.controls.user\">\n                <p class=\"text-danger small-text\" *ngIf=\"forgotPasswordForm.controls.user.errors?.required && forgotPasswordForm.controls.user.dirty\">必須項目</p>\n            </div>\n\n            <button [disabled]=\"forgotPasswordForm.invalid\" type=\"submit\" class=\"btn btn-primary btn-block mb-small\">パスワードリセット</button>\n        </form>\n    </div>\n</div>\n\n<app-loading *ngIf=\"isLoading\"></app-loading>"

/***/ }),

/***/ "../../../../../src/app/components/auth/forgot-password/forgot-password.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".inner {\n  padding: 0;\n  width: 300px; }\n\n.logo img {\n  width: 80px;\n  height: 49px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/auth/forgot-password/forgot-password.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPasswordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * ForgotPasswordComponent
 */


var ForgotPasswordComponent = /** @class */ (function () {
    function ForgotPasswordComponent(formBuilder) {
        this.formBuilder = formBuilder;
        console.log('LoginComponent constructor');
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        this.isLoading = false;
        this.forgotPasswordForm = this.formBuilder.group({
            user: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required
            ]),
            password: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required
            ])
        });
    };
    ForgotPasswordComponent.prototype.resetPassword = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ForgotPasswordComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-forgot-password',
            template: __webpack_require__("../../../../../src/app/components/auth/forgot-password/forgot-password.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/auth/forgot-password/forgot-password.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */]) === "function" && _a || Object])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
    var _a;
}());

//# sourceMappingURL=forgot-password.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/auth/sign-in/sign-in.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"contents position-center\">\n    <div class=\"inner center\">\n        <form [formGroup]=\"signInForm\" (ngSubmit)=\"signIn()\">\n            <div class=\"mb-small\">\n                <label class=\"control-label small-text\">ユーザー</label>\n                <input type=\"text\" class=\"form-control\" name=\"userName\" [formControl]=\"signInForm.controls.userName\">\n                <p class=\"text-danger small-text\" *ngIf=\"signInForm.controls.userName.errors?.required && signInForm.controls.userName.dirty\">必須項目</p>\n            </div>\n\n            <div class=\"mb-small\">\n                <label class=\"control-label small-text\">パスワード</label>\n                <input type=\"password\" class=\"form-control\" name=\"password\" [formControl]=\"signInForm.controls.password\">\n                <p class=\"text-danger small-text\" *ngIf=\"signInForm.controls.password.errors?.required && signInForm.controls.password.dirty\">必須項目</p>\n                <p class=\"text-danger small-text\" *ngIf=\"signInForm.controls.password.errors?.minlength && signInForm.controls.password.dirty\">8文字以上で入力してください</p>\n            </div>\n\n            <button [disabled]=\"signInForm.invalid\" type=\"submit\" class=\"btn btn-primary btn-block mb-small\">サインイン</button>\n\n            <div routerLink=\"/auth/forgotPassword\">パスワードを忘れた方はこちら</div>\n        </form>\n    </div>\n</div>\n\n<app-loading *ngIf=\"isLoading\"></app-loading>"

/***/ }),

/***/ "../../../../../src/app/components/auth/sign-in/sign-in.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".inner {\n  padding: 0;\n  width: 300px; }\n\n.logo img {\n  width: 80px;\n  height: 49px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/auth/sign-in/sign-in.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignInComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_user_login_user_login_service__ = __webpack_require__("../../../../../src/app/service/user-login/user-login.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * SignInComponent
 */




var SignInComponent = /** @class */ (function () {
    function SignInComponent(formBuilder, router, userLogin) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.userLogin = userLogin;
        console.log('LoginComponent constructor');
    }
    SignInComponent.prototype.ngOnInit = function () {
        this.isLoading = false;
        this.signInForm = this.formBuilder.group({
            userName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required
            ]),
            password: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required
            ])
        });
    };
    SignInComponent.prototype.signIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var authenticateResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLoading = true;
                        this.error = null;
                        return [4 /*yield*/, this.userLogin.authenticate(this.signInForm.controls.userName.value, this.signInForm.controls.password.value)];
                    case 1:
                        authenticateResult = _a.sent();
                        this.cognitoCallback(authenticateResult.message, authenticateResult.result);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 会員登録後の遷移
     * @param message 登録失敗時のメッセージ
     * @param result 登録成功時の結果
     */
    SignInComponent.prototype.cognitoCallback = function (message, result) {
        if (message != null) {
            this.error = new Error(message);
            console.log('result', this.error);
            this.isLoading = false;
        }
        else {
            // move to the next step
            console.log('result', result);
            this.router.navigate(['/']);
        }
    };
    SignInComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-sign-in',
            template: __webpack_require__("../../../../../src/app/components/auth/sign-in/sign-in.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/auth/sign-in/sign-in.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__service_user_login_user_login_service__["a" /* UserLoginService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__service_user_login_user_login_service__["a" /* UserLoginService */]) === "function" && _c || Object])
    ], SignInComponent);
    return SignInComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=sign-in.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/auth/sign-out/sign-out.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"cover\" [class.active]=\"isOpen\" (click)=\"close.emit()\"></div>\n\n<div class=\"modal position-center\" [class.active]=\"isOpen\">\n    <div class=\"inner\">\n        <div class=\"mb-middle text-center\">ログアウトしますか？</div>\n        <button class=\"mb-x-small btn btn-info btn-block\" (click)=\"logout()\">ログアウト</button>\n        <button class=\"btn btn-info btn-block\" (click)=\"close.emit()\">キャンセル</button>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/auth/sign-out/sign-out.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".cover {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 20;\n  background-color: rgba(0, 0, 0, 0.75);\n  display: none; }\n  .cover.active {\n    display: block; }\n\n.modal {\n  visibility: hidden;\n  z-index: 20; }\n  .modal.active {\n    visibility: visible; }\n  .modal .inner {\n    padding: 40px 25px;\n    background-color: #333;\n    min-width: 300px;\n    max-width: 100%;\n    border-radius: 5px;\n    border: 1px solid #FFF; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/auth/sign-out/sign-out.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignOutComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_sasaki_sasaki_service__ = __webpack_require__("../../../../../src/app/service/sasaki/sasaki.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * LogoutComponent
 */



var SignOutComponent = /** @class */ (function () {
    function SignOutComponent(router, sasaki) {
        this.router = router;
        this.sasaki = sasaki;
        this.close = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    SignOutComponent.prototype.ngOnInit = function () {
    };
    SignOutComponent.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.sasaki.auth.signOut()];
                    case 1:
                        _a.sent();
                        console.log('logout');
                        this.sasaki.credentials = null;
                        this.router.navigate(['/auth']);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], SignOutComponent.prototype, "isOpen", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
    ], SignOutComponent.prototype, "close", void 0);
    SignOutComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-sign-out',
            template: __webpack_require__("../../../../../src/app/components/auth/sign-out/sign-out.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/auth/sign-out/sign-out.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__service_sasaki_sasaki_service__["a" /* SasakiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_sasaki_sasaki_service__["a" /* SasakiService */]) === "function" && _c || Object])
    ], SignOutComponent);
    return SignOutComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=sign-out.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/auth/sign-up/sign-up.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"contents position-center\">\n    <div class=\"inner center\">\n        <form [formGroup]=\"signUpForm\" (ngSubmit)=\"signUp()\">\n            <div class=\"mb-small\">\n                <label class=\"control-label small-text\">ユーザー</label>\n                <input type=\"text\" class=\"form-control\" name=\"userName\" [formControl]=\"signUpForm.controls.userName\">\n                <p class=\"text-danger small-text\" *ngIf=\"signUpForm.controls.userName.errors?.required && signUpForm.controls.userName.dirty\">必須項目</p>\n            </div>\n\n            <div class=\"mb-small\">\n                <label class=\"control-label small-text\">パスワード</label>\n                <input type=\"password\" class=\"form-control\" name=\"password\" [formControl]=\"signUpForm.controls.password\">\n                <p class=\"text-danger small-text\" *ngIf=\"signUpForm.controls.password.errors?.required && signUpForm.controls.password.dirty\">必須項目</p>\n                <p class=\"text-danger small-text\" *ngIf=\"signUpForm.controls.password.errors?.minlength && signUpForm.controls.password.dirty\">8文字以上で入力してください</p>\n            </div>\n\n            <div class=\"mb-small\">\n                <label class=\"control-label small-text\">メールアドレス</label>\n                <input type=\"email\" class=\"form-control\" name=\"mail\" [formControl]=\"signUpForm.controls.mail\">\n                <p class=\"text-danger small-text\" *ngIf=\"signUpForm.controls.mail.errors?.required && signUpForm.controls.mail.dirty\">必須項目</p>\n                <p class=\"text-danger small-text\" *ngIf=\"signUpForm.controls.mail.errors?.maxlength && signUpForm.controls.mail.dirty\">30文字以内で入力してください</p>\n                <p class=\"text-danger small-text\" *ngIf=\"signUpForm.controls.mail.errors?.email && signUpForm.controls.mail.dirty\">メール形式で入力してください</p>\n            </div>\n\n            <div class=\"mb-small\">\n                <label class=\"control-label small-text\">せい</label>\n                <input type=\"text\" class=\"form-control\" name=\"familyName\" [formControl]=\"signUpForm.controls.familyName\">\n                <p class=\"text-danger small-text\" *ngIf=\"signUpForm.controls.familyName.errors?.required && signUpForm.controls.familyName.dirty\">必須項目</p>\n                <p class=\"text-danger small-text\" *ngIf=\"signUpForm.controls.familyName.errors?.maxlength && signUpForm.controls.familyName.dirty\">10文字以内で入力してください</p>\n                <p class=\"text-danger small-text\" *ngIf=\"signUpForm.controls.familyName.errors?.pattern && signUpForm.controls.familyName.dirty\">ひらがなで入力してください</p>\n            </div>\n\n            <div class=\"mb-small\">\n                <label class=\"control-label small-text\">めい</label>\n                <input type=\"text\" class=\"form-control\" name=\"givenName\" [formControl]=\"signUpForm.controls.givenName\">\n                <p class=\"text-danger small-text\" *ngIf=\"signUpForm.controls.givenName.errors?.required && signUpForm.controls.givenName.dirty\">必須項目</p>\n                <p class=\"text-danger small-text\" *ngIf=\"signUpForm.controls.givenName.errors?.maxlength && signUpForm.controls.givenName.dirty\">10文字以内で入力してください</p>\n                <p class=\"text-danger small-text\" *ngIf=\"signUpForm.controls.givenName.errors?.pattern && signUpForm.controls.givenName.dirty\">ひらがなで入力してください</p>\n            </div>\n\n            <div class=\"mb-small\">\n                <label class=\"control-label small-text\">電話番号</label>\n                <input type=\"tel\" class=\"form-control\" name=\"telephone\" [formControl]=\"signUpForm.controls.telephone\">\n                <p class=\"text-danger small-text\" *ngIf=\"signUpForm.controls.telephone.errors?.required && signUpForm.controls.telephone.dirty\">必須項目</p>\n                <p class=\"text-danger small-text\" *ngIf=\"signUpForm.controls.telephone.errors?.maxlength && signUpForm.controls.telephone.dirty\">15文字以内で入力してください</p>\n                <p class=\"text-danger small-text\" *ngIf=\"signUpForm.controls.telephone.errors?.pattern && signUpForm.controls.telephone.dirty\">数字で入力してください</p>\n            </div>\n\n            <button [disabled]=\"signUpForm.invalid\" type=\"submit\" class=\"btn btn-primary btn-block\">登録</button>\n        </form>\n    </div>\n</div>\n\n<app-loading *ngIf=\"isLoading\"></app-loading>"

/***/ }),

/***/ "../../../../../src/app/components/auth/sign-up/sign-up.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".inner {\n  padding: 0;\n  width: 300px; }\n\n.logo img {\n  width: 80px;\n  height: 49px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/auth/sign-up/sign-up.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_user_registration_user_registration_service__ = __webpack_require__("../../../../../src/app/service/user-registration/user-registration.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * SignUpComponent
 */




var SignUpComponent = /** @class */ (function () {
    function SignUpComponent(formBuilder, userRegistration, router) {
        this.formBuilder = formBuilder;
        this.userRegistration = userRegistration;
        this.router = router;
        console.log('SignUpComponent constructor');
    }
    SignUpComponent.prototype.ngOnInit = function () {
        this.isLoading = false;
        this.error = null;
        this.signUpForm = this.formBuilder.group({
            userName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required
            ]),
            password: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].minLength(8)
            ]),
            mail: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].maxLength(30),
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].email
            ]),
            givenName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].maxLength(10),
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].pattern(/^[ぁ-ゞー]+$/)
            ]),
            familyName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].maxLength(10),
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].pattern(/^[ぁ-ゞー]+$/)
            ]),
            telephone: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].maxLength(15),
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].pattern(/^[0-9]+$/)
            ])
        });
    };
    SignUpComponent.prototype.signUp = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.isLoading = true;
                this.registrationUser = {
                    username: this.signUpForm.controls.userName.value,
                    password: this.signUpForm.controls.password.value,
                    email: this.signUpForm.controls.mail.value,
                    familyName: this.signUpForm.controls.familyName.value,
                    givenName: this.signUpForm.controls.givenName.value,
                    phoneNumber: this.signUpForm.controls.telephone.value
                };
                this.userRegistration.register(this.registrationUser, this);
                return [2 /*return*/];
            });
        });
    };
    /**
     * 会員登録後の遷移
     * @param message 登録失敗時のメッセージ
     * @param result 登録成功時の結果
     */
    SignUpComponent.prototype.cognitoCallback = function (message, result) {
        if (message != null) {
            this.error = new Error(message);
            console.log('result:', this.error.message);
            this.isLoading = false;
        }
        else {
            // move to the next step
            this.router.navigate(['/auth/confirmRegistration', result.user.username]);
        }
    };
    SignUpComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-sign-up',
            template: __webpack_require__("../../../../../src/app/components/auth/sign-up/sign-up.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/auth/sign-up/sign-up.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__service_user_registration_user_registration_service__["a" /* UserRegistrationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__service_user_registration_user_registration_service__["a" /* UserRegistrationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _c || Object])
    ], SignUpComponent);
    return SignUpComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=sign-up.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/base/base.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\n<router-outlet></router-outlet>\n<app-navigation></app-navigation>"

/***/ }),

/***/ "../../../../../src/app/components/base/base.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/base/base.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * BaseComponent
 */

var BaseComponent = /** @class */ (function () {
    function BaseComponent() {
    }
    BaseComponent.prototype.ngOnInit = function () {
    };
    BaseComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-base',
            template: __webpack_require__("../../../../../src/app/components/base/base.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/base/base.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], BaseComponent);
    return BaseComponent;
}());

//# sourceMappingURL=base.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/header-menu/header-menu.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"cover\" [class.active]=\"isOpen\" (click)=\"close.emit()\"></div>\n\n<div class=\"menu\" [class.active]=\"isOpen\">\n    <div class=\"title\">{{ name }}</div>\n    <ul>\n        <li><span routerLink=\"/about\" routerLinkActive=\"active\" (click)=\"close.emit()\">このアプリについて</span></li>\n        <li><span routerLink=\"/profile\" routerLinkActive=\"active\" (click)=\"close.emit()\">ユーザー情報変更</span></li>\n        <li><span routerLink=\"/policy\" routerLinkActive=\"active\" (click)=\"close.emit()\">利用規約</span></li>\n        <li><span routerLink=\"/law\" routerLinkActive=\"active\" (click)=\"close.emit()\">特定商取引法に基づく表記</span></li>\n        <li><span routerLink=\"/privacy\" routerLinkActive=\"active\" (click)=\"close.emit()\">プライバシーポリシー</span></li>\n        <li><a [href]=\"portalSite\" target=\"_blank\">シネマサンシャインポータルサイト</a></li>\n        <li><span (click)=\"logout.emit()\">ログアウト</span></li>\n    </ul>\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/header-menu/header-menu.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".cover {\n  position: fixed;\n  top: 48px;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 20;\n  background-color: rgba(0, 0, 0, 0.75);\n  display: none; }\n  .cover.active {\n    display: block; }\n\n.menu {\n  position: fixed;\n  top: 48px;\n  bottom: 0;\n  right: -100%;\n  z-index: 20;\n  background-color: #000;\n  width: 100%;\n  overflow: scroll;\n  transition: right 0.1s; }\n  .menu.active {\n    right: 0; }\n  .menu .title {\n    background-color: #CCC;\n    color: #333;\n    padding: 30px; }\n  .menu li {\n    border-bottom: 1px solid #CCC; }\n    .menu li a, .menu li span {\n      display: block;\n      background-color: #111;\n      padding: 30px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/header-menu/header-menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_user_user_service__ = __webpack_require__("../../../../../src/app/service/user/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * HeaderMenuComponent
 */



var HeaderMenuComponent = /** @class */ (function () {
    function HeaderMenuComponent(user) {
        this.user = user;
        this.logout = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.close = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    HeaderMenuComponent.prototype.ngOnInit = function () {
        this.portalSite = __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].portalSite;
        this.name = this.user.contacts.familyName + " " + this.user.contacts.givenName;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], HeaderMenuComponent.prototype, "isOpen", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
    ], HeaderMenuComponent.prototype, "logout", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _b || Object)
    ], HeaderMenuComponent.prototype, "close", void 0);
    HeaderMenuComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-header-menu',
            template: __webpack_require__("../../../../../src/app/components/header-menu/header-menu.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/header-menu/header-menu.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__service_user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_user_user_service__["a" /* UserService */]) === "function" && _c || Object])
    ], HeaderMenuComponent);
    return HeaderMenuComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=header-menu.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<header>\n    <h1>{{ page.title }}</h1>\n    <div class=\"button\" [class.active]=\"isMenuOpen\" (click)=\"(isMenuOpen) ? menuClose() : menuOpen()\">\n        <div></div><div></div><div></div>\n    </div>\n</header>\n\n<app-header-menu [isOpen]=\"isMenuOpen\" (logout)=\"logoutModalOpen()\" (close)=\"menuClose()\"></app-header-menu>\n\n<app-logout [isOpen]=\"isLogoutModalOpen\" (close)=\"logoutModalClose()\"></app-logout>\n"

/***/ }),

/***/ "../../../../../src/app/components/header/header.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  height: 48px;\n  display: block; }\n\nheader {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 10;\n  width: 100%;\n  height: 48px;\n  background-color: #000; }\n  header h1 {\n    text-align: center;\n    line-height: 48px;\n    font-weight: normal; }\n  header .button {\n    display: block;\n    position: absolute;\n    top: 50%;\n    right: 20px;\n    margin-top: -8px;\n    width: 20px;\n    height: 16px; }\n    header .button div {\n      position: absolute;\n      top: 50%;\n      left: 0;\n      margin-top: -0.5px;\n      width: 100%;\n      height: 1px;\n      background-color: #FFF; }\n      header .button div:first-child {\n        top: 0;\n        margin-top: 0; }\n      header .button div:last-child {\n        top: initial;\n        bottom: 0;\n        margin-top: 0; }\n    header .button.active div {\n      opacity: 0; }\n      header .button.active div:first-child {\n        opacity: 1;\n        top: 50%;\n        margin-top: -1px;\n        -webkit-transform: rotate(45deg);\n                transform: rotate(45deg); }\n      header .button.active div:last-child {\n        opacity: 1;\n        top: 50%;\n        bottom: initial;\n        margin-top: -1px;\n        -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg); }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * HeaderComponent
 */


var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(router) {
        this.router = router;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isMenuOpen = false;
        this.isLogoutModalOpen = false;
        this.changePage(this.router.url);
        this.router.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* NavigationEnd */]) {
                _this.changePage(event.url);
            }
        });
    };
    HeaderComponent.prototype.menuOpen = function () {
        this.isMenuOpen = true;
    };
    HeaderComponent.prototype.menuClose = function () {
        this.isMenuOpen = false;
    };
    HeaderComponent.prototype.logoutModalOpen = function () {
        this.menuClose();
        this.isLogoutModalOpen = true;
    };
    HeaderComponent.prototype.logoutModalClose = function () {
        this.isLogoutModalOpen = false;
    };
    HeaderComponent.prototype.changePage = function (url) {
        var page = pages.find(function (value) {
            return (value.url === url);
        });
        if (page === undefined) {
            this.page = { url: '', title: 'NOT FOUND', prev: false };
            return;
        }
        this.page = page;
    };
    HeaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-header',
            template: __webpack_require__("../../../../../src/app/components/header/header.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/header/header.component.scss")]
        })
        /**
         * ヘッダー
         * @class HeaderComponent
         * @implements OnInit
         */
        ,
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object])
    ], HeaderComponent);
    return HeaderComponent;
    var _a;
}());

/**
 * ページ情報
 * @const pages
 */
var pages = [
    { url: '/ticket', title: 'チケットホルダー', prev: false },
    { url: '/purchase', title: 'チケット購入', prev: false },
    { url: '/setting', title: '設定変更', prev: false },
    { url: '/about', title: 'このアプリについて', prev: true },
    { url: '/profile', title: 'ユーザー情報変更', prev: true },
    { url: '/policy', title: '利用規約', prev: true },
    { url: '/law', title: '特定商取引法に基づく表記', prev: true },
    { url: '/privacy', title: 'プライバシーポリシー', prev: true }
];
//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/law/law.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"contents bg-image-blue\">\n    <div class=\"inner\">\n        <p class=\"box\">\n            「特定商取引に関する法律」第11条（通信販売についての広告）に基づき、商品の提供条件を次のとおり明示します。<br>\n            事業者<br>\n            <br>\n            販売事業者<br>\n            佐々木興業株式会社<br>\n            お問合せ先<br>\n            〒170-0013  東京都豊島区東池袋1-14-3<br>\n            佐々木興業株式会社  シネマサンシャイン運営部<br>\n            電話<br>\n            03-3982-6101(月曜～金曜  10:00～18:00、ただし祝日・年末年始は除く)<br>\n            ご購入に際して<br>\n            <br>\n            ご購入対象・価格・期間<br>\n            チケットの販売価格は、本サイトにおいて表示された価格となります。<br>\n            その他お客様にご負担いただく費用消費税をご負担いただきます。なお、本サイト内の表示価格は、消費税込みの金額を表示しております。<br>\n            チケットの引渡し方法・時期チケットの発券は、チケットご購入時にWEB上の確認画面または、弊社から送信させていただきます確認の電子メールに 記載された「シネマサンシャイン」に備え付けの自動発券機において、お客様は、「引換番号」および「購入チケット確認用暗証番号」を入力 いただくことによって行います。「引換番号」および「購入チケット確認用暗証番号」を失念された場合、発券することができないことがございます。 また、上映開始時刻を過ぎますと発券できません。予めご了承下さい。なお、郵便または宅配便等によるチケットの送付は行っておりません。<br>\n            購入枚数の制限一回のご購入手続において購入いただけますチケット枚数の上限は、6枚までとさせていただきます。7枚以上購入される場合には、 再度お手続きをお願いいたします。<br>\n            チケットは映画上映当日の上映開始1時間前までご購入いただけます。<br>\n            お支払い方法<br>\n            クレジットカードによる決済のみとなっております。<br>\n            利用可能なクレジットカード：MUFG、DC、UFJ、NICOS、Master、VISA、UC、JCB、American Express<br>\n            お支払い時期：<br>\n            クレジットカード決済画面におけるクレジットカード情報の送信完了時に各カード会社にお客様情報を送信し、決済させていただきます。なお、 ご請求日は各カード会社により異なります。<br>\n            キャンセルおよび払い戻し：<br>\n            ご購入手続完了後においては、上映中止または延期の場合を除き、お客様の不可抗力による来場遅延等の理由にかかわらず、ご鑑賞作品の変更、 他の上映時間または座席への変更、もしくはチケットの払い戻しは一切いたしません。また、ご購入されたチケットのお引き取りがない場合においても、払い戻しはいたしません。\n            弊社の事情により上映を中止または延期した場合、期間および場所を定めて当該中止にかかわるチケットの払い戻しを実施します。ただし、 払い戻しの期間を過ぎた場合、発券済のチケットを紛失・破損し、または甚だしく汚損し判読しがたい場合には、一切払い戻しはいたしません。また、 チケットの購入金額以外の費用（手数料、交通費、宿泊費、通信費、送付料等）はお支払いいたしません。<br>\n            払い戻しの期間・場所：<br>\n            原則として、チケットご購入時にWEB上の確認画面または、弊社から送信させていただきます確認の電子メールに記載された「劇場」において 払い戻しを行います。払い戻しの期間については、各「シネマサンシャイン」までお問い合わせ下さい。<br>\n            払い戻しの方法<br>\n            原則として、チケットとの交換による現金での払い戻しとなります。\n        </p>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/law/law.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/law/law.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LawComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * LawComponent
 */

var LawComponent = /** @class */ (function () {
    function LawComponent() {
    }
    LawComponent.prototype.ngOnInit = function () {
    };
    LawComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-law',
            template: __webpack_require__("../../../../../src/app/components/law/law.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/law/law.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], LawComponent);
    return LawComponent;
}());

//# sourceMappingURL=law.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/loading/loading.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"cover\"></div>\n<div class=\"loading\">\n    <div class=\"bar1\"></div>\n    <div class=\"bar2\"></div>\n    <div class=\"bar3\"></div>\n    <div class=\"bar4\"></div>\n    <div class=\"bar5\"></div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/loading/loading.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".cover {\n  opacity: 0;\n  background-color: rgba(0, 0, 0, 0.7);\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 11;\n  visibility: visible;\n  -webkit-animation: fadein 0.4s both;\n          animation: fadein 0.4s both; }\n\n.loading {\n  opacity: 0;\n  visibility: hidden;\n  position: fixed;\n  z-index: 10;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  top: 50%;\n  left: 50%;\n  z-index: 11;\n  width: 70px;\n  height: 30px;\n  margin-top: -15px;\n  margin-left: -35px;\n  -webkit-animation: fadein 0.4s both;\n          animation: fadein 0.4s both;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n  .loading div {\n    height: 30px;\n    width: 3px;\n    background-color: #FFF;\n    -webkit-animation: loading 1s infinite;\n            animation: loading 1s infinite; }\n  .loading .bar1 {\n    -webkit-animation-delay: 0.5s;\n            animation-delay: 0.5s; }\n  .loading .bar2 {\n    -webkit-animation-delay: 0.6s;\n            animation-delay: 0.6s; }\n  .loading .bar3 {\n    -webkit-animation-delay: 0.7s;\n            animation-delay: 0.7s; }\n  .loading .bar4 {\n    -webkit-animation-delay: 0.8s;\n            animation-delay: 0.8s; }\n  .loading .bar5 {\n    -webkit-animation-delay: 0.9s;\n            animation-delay: 0.9s; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/loading/loading.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * LoadingComponent
 */

var LoadingComponent = /** @class */ (function () {
    function LoadingComponent() {
    }
    LoadingComponent.prototype.ngOnInit = function () { };
    LoadingComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-loading',
            template: __webpack_require__("../../../../../src/app/components/loading/loading.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/loading/loading.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], LoadingComponent);
    return LoadingComponent;
}());

//# sourceMappingURL=loading.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/logout/logout.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"cover\" [class.active]=\"isOpen\" (click)=\"close.emit()\"></div>\n\n<div class=\"modal position-center\" [class.active]=\"isOpen\">\n    <div class=\"inner\">\n        <div class=\"mb-middle text-center\">ログアウトしますか？</div>\n        <button class=\"mb-x-small btn btn-info btn-block\" (click)=\"logout()\">ログアウト</button>\n        <button class=\"btn btn-info btn-block\" (click)=\"close.emit()\">キャンセル</button>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/logout/logout.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".cover {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 20;\n  background-color: rgba(0, 0, 0, 0.75);\n  display: none; }\n  .cover.active {\n    display: block; }\n\n.modal {\n  visibility: hidden;\n  z-index: 20; }\n  .modal.active {\n    visibility: visible; }\n  .modal .inner {\n    padding: 40px 25px;\n    background-color: #333;\n    min-width: 300px;\n    max-width: 100%;\n    border-radius: 5px;\n    border: 1px solid #FFF; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/logout/logout.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogoutComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_sasaki_sasaki_service__ = __webpack_require__("../../../../../src/app/service/sasaki/sasaki.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * LogoutComponent
 */



var LogoutComponent = /** @class */ (function () {
    function LogoutComponent(router, sasaki) {
        this.router = router;
        this.sasaki = sasaki;
        this.close = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    LogoutComponent.prototype.ngOnInit = function () {
    };
    LogoutComponent.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.sasaki.auth.signOut()];
                    case 1:
                        _a.sent();
                        console.log('logout');
                        this.sasaki.credentials = null;
                        this.router.navigate(['/auth']);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], LogoutComponent.prototype, "isOpen", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
    ], LogoutComponent.prototype, "close", void 0);
    LogoutComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-logout',
            template: __webpack_require__("../../../../../src/app/components/logout/logout.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/logout/logout.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__service_sasaki_sasaki_service__["a" /* SasakiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_sasaki_sasaki_service__["a" /* SasakiService */]) === "function" && _c || Object])
    ], LogoutComponent);
    return LogoutComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=logout.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/navigation/navigation.component.html":
/***/ (function(module, exports) {

module.exports = "<ul>\n    <li routerLink=\"/ticket\" routerLinkActive=\"active\">\n        <div class=\"mb-x-small icon-ticket-holder-white\"></div>\n        <div>チケットホルダー</div>\n    </li>\n    <li routerLink=\"/purchase\" routerLinkActive=\"active\">\n        <div class=\"mb-x-small icon-purchase-white\"></div>\n        <div>チケット購入</div>\n    </li>\n    <li routerLink=\"/point\" routerLinkActive=\"active\">\n        <div class=\"mb-x-small icon-purchase-white\"></div>\n        <div>ポイント管理</div>\n    </li>\n</ul>"

/***/ }),

/***/ "../../../../../src/app/components/navigation/navigation.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  height: 60px;\n  display: block; }\n\nul {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  z-index: 10;\n  display: table;\n  table-layout: fixed;\n  width: 100%;\n  height: 60px;\n  background-color: #555; }\n  ul li {\n    display: table-cell;\n    border-bottom: 5px solid #888;\n    font-size: 10px;\n    text-align: center;\n    vertical-align: middle;\n    opacity: 0.7; }\n    ul li.active {\n      background-color: #333;\n      border-bottom-color: #00A0E9;\n      opacity: 1; }\n    ul li .icon-ticket-holder-white:before, ul li .icon-purchase-white:before {\n      margin: auto; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/navigation/navigation.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavigationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * NavigationComponent
 */

var NavigationComponent = /** @class */ (function () {
    function NavigationComponent() {
    }
    NavigationComponent.prototype.ngOnInit = function () {
    };
    NavigationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-navigation',
            template: __webpack_require__("../../../../../src/app/components/navigation/navigation.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/navigation/navigation.component.scss")]
        })
        /**
         * ナビゲーション
         * @class NavigationComponent
         * @implements OnInit
         */
        ,
        __metadata("design:paramtypes", [])
    ], NavigationComponent);
    return NavigationComponent;
}());

//# sourceMappingURL=navigation.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/not-found/not-found.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"contents\">\n    <div class=\"position-center\">\n        <p class=\"large-text text-center\">NOT FOUND</p>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/not-found/not-found.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/not-found/not-found.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotFoundComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * NotFoundComponent
 */


var NotFoundComponent = /** @class */ (function () {
    function NotFoundComponent(router) {
        this.router = router;
    }
    NotFoundComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.router.navigate(['']);
                return [2 /*return*/];
            });
        });
    };
    NotFoundComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-not-found',
            template: __webpack_require__("../../../../../src/app/components/not-found/not-found.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/not-found/not-found.component.scss")]
        })
        /**
         * NotFound
         * @class NotFoundComponent
         * @implements OnInit
         */
        ,
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object])
    ], NotFoundComponent);
    return NotFoundComponent;
    var _a;
}());

//# sourceMappingURL=not-found.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/policy/policy.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"contents bg-image-blue\">\n    <div class=\"inner\">\n        <p class=\"box\">   \n            本規約は、佐々木興業株式会社（以下「当社」）が独自に規定するものであり、当社の運営する「シネマサンシャイン」が提供するサービスに提供されるものとします。<br>\n            当社が提供するシネマサンシャインをご利用になる場合には、本規約に従っていただく必要があります。ご利用の皆様はシネマサンシャインの利用をもって、本規約の内容を承諾いただけたものとみなします。<br>\n            本規約は必要に応じて適宜見直しを行ないますので、ご利用の際には本ページに掲載されている最新の利用規約をご確認下さい。<br>\n            1.個人登録情報の取り扱いについて<br>\n            個人情報に関してはシネマサンシャインにて最大限の注意を払い管理いたします。個人情報の取り扱いについては、プライバシーポリシーにまとめてありますので、そちらもご覧下さい。<br>\n            またシネマサンシャインの営業譲渡が行なわれる際は、譲渡を受けた獲得者に移管いたします。なお、退会申請には速やかに応じ、個人情報を削除いたします。<br>\n            2.ID及びパスワードの管理について<br>\n            ID及びパスワードの管理は、登録ユーザーの責任において行なっていただきます。ID及びパスワードを利用して行なわれた行為は、そのIDを保有している登録ユーザーの責任とみなします。<br>\n            第三者への漏洩の疑いがある場合は、直ちにシネマサンシャインまでご連絡下さい。シネマサンシャインはID及びパスワードの不正使用などから生じた損害について一切責任を負いません。<br>\n            3.登録事項の変更について<br>\n            ユーザー登録の必須項目に変更があった際には、速やかに情報の変更をお願いいたします。<br>\n            4.禁止事項<br>\n            他の利用者や第三者を誹謗中傷する行為や、不当に足を引っ張ろうとする行為。<br>\n            公正な場を不当に歪めようとする行為。<br>\n            運営者が、不適切と判断した行為。<br>\n            5.登録ユーザーの資格保留又は削除について<br>\n            シネマサンシャインは、上記禁止事項に違反した登録ユーザーに対し、資格を保留・削除する権利を保有します。また、コンテンツを削除する権利も保有します。その判断に関しては、運営者の裁量にて行使されます。これにより損害が発生した場合でもシネマサンシャインは責任を負いません。<br>\n            6.サービスの中断<br>\n            シネマサンシャインは、設備的事情等のやむを得ない場合に限って、利用者に事前通知なくサービスを一時的に中断することがあります。その際に利用者に生じた不利益や損失などに対して、一切の責任を負わないものとします。<br>\n            7.営業の中止について<br>\n            シネマサンシャインは、利用者にWebサイト上またはメールによる通知の上、サービスの全部または一部を中止できるものとします。サービスの終了に伴い生じる利用者の不利益や損害などに対して、一切の責任を負わないものとします。<br>\n            8.免責事項<br>\n            シネマサンシャインは、本サイトの利用に際して利用者が生じた不利益や損害などに対して、一切の責任を負わないものとします。<br>\n            利用者が本サイトから得る情報などについての一切は、その受け手の責任において判断するものとし、シネマサンシャインは、いかなる保証も行なわないものにします。<br>\n            利用者が使用する機器・ソフトウェアについて、シネマサンシャインは、その動作保証は一切行なわないものとします。<br>\n            シネマサンシャインをきっかけに契約に至った案件に関して、その後に生じたトラブルなど、シネマサンシャインでは一切の責任を負わないものとします。<br>\n            9.準拠法および裁判管轄について<br>\n            本規約には、日本法が適用されます。また、本規約に関連する利用者とシネマサンシャイン間の紛争については、東京地方裁判所を第一審専属管轄裁判所とします。<br>\n        </p>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/policy/policy.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/policy/policy.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PolicyComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * PolicyComponent
 */

var PolicyComponent = /** @class */ (function () {
    function PolicyComponent() {
    }
    PolicyComponent.prototype.ngOnInit = function () {
    };
    PolicyComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-policy',
            template: __webpack_require__("../../../../../src/app/components/policy/policy.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/policy/policy.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PolicyComponent);
    return PolicyComponent;
}());

//# sourceMappingURL=policy.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/privacy/privacy.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"contents bg-image-blue\">\n    <div class=\"inner\">\n        <p class=\"box\">\n            2009年4月15日<br>\n            当社はお客様の氏名・性別・生年月日・お住まい・職種のお申し込み内容等の個人情報の保護に関し、以下の取組みを実施いたしております。<br>\n            1.当社は、個人情報に関する法令おおびその他の規範を遵守し、お客さまの大切な個人情報の保護に万全を尽くします。<br>\n            2.当社はお客さまの個人情報について、下記の目的の範囲内で適正に取り扱いさせていただきます。<br>\n            ・ご本人確認、ご利用サービスの停止・中止の通知並びにその他当社のサービスの提供に係わること。<br>\n            ・電子メールによる当社または提携先の提供するサービスに関する情報提供、販売の推奨、アンケート調査および景品等の送付あるいは提供を行うこと。<br>\n            ・集計、分析処理を行い、個人を認識できない形状に加工して利用または提携先等に提供すること。<br>\n            ・当社のサービス改善または新たなサービスの開発を行うこと。<br>\n            ・お問い合わせ、ご相談にお答えすること。<br>\n            なお、上記利用目的等を定める場合があります。また、お客さまとのお電話での対応時において、ご意見・ご要望等の正確な把握、 今後のサービス向上のために、通話を録音させていただく場合がございます。<br>\n            当社の提供するウェブサイトやサービスをより便利にご利用いただくために、クッキー等の技術を利用する場合があります。<br>\n            クッキー等を利用して取得したサービスの利用状況を個人を特定して利用する場合は、個人情報として取り扱います。<br>\n            3.当社は、お客さまの個人情報を適正に取扱うため、社内規定及び管理体制の整備、従業員の教育、並びに、個人情報への不正アクセスや 個人情報の紛失、破壊、改ざんおよび漏洩防止等に関する適切な措置を行ない、またその見直しを継続して図ることにより、個人情報の保護に 努めてまいります。<br>\n            4.当社は、お客さまの個人情報については、上記利用目的を達成するために、業務委託先または提携先に預託する場合がございます。その場合は個人情報保護の契約を締結する等の必要かつ適切な処置を実施いたします。なお法令等に基づき裁判所からの開示の要請があった場合については、当該公的機関に提供することがございます。<br>\n            5.当社は、本サービスをご利用のお客さまについて、利用目的の達成に必要な範囲でお客様の個人データを共同利用する場合があります。<br>\n            ・共同利用される個人データは、お客さまのお名前、生年月日、お住まい、性別、サービス利用状況等です。<br>\n            ・共同利用者の範囲は当社および当社関連会社です。<br>\n            ・共同利用における利用目的は、当社の利用目的と同じです。<br>\n            ・共同利用における管理責任者佐々木興業株式会社(会社概要)です。\n        </p>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/privacy/privacy.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".privacy {\n  padding-top: 40px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/privacy/privacy.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrivacyComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * PrivacyComponent
 */

var PrivacyComponent = /** @class */ (function () {
    function PrivacyComponent() {
    }
    PrivacyComponent.prototype.ngOnInit = function () {
    };
    PrivacyComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-privacy',
            template: __webpack_require__("../../../../../src/app/components/privacy/privacy.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/privacy/privacy.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PrivacyComponent);
    return PrivacyComponent;
}());

//# sourceMappingURL=privacy.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/profile/profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"contents bg-image-blue\">\n    <div class=\"inner\">\n        <p class=\"mb-middle text-center\">該当の項目を編集して更新を押してください。</p>\n        <form [formGroup]=\"updateForm\" (ngSubmit)=\"submit()\">\n            <div class=\"mb-small\">\n                <label class=\"control-label small-text\">メールアドレス</label>\n                <input type=\"email\" class=\"form-control\" name=\"mail\" [formControl]=\"updateForm.controls.mail\">\n                <p class=\"text-danger small-text\" *ngIf=\"updateForm.controls.mail.errors?.required && updateForm.controls.mail.dirty\">必須項目</p>\n                <p class=\"text-danger small-text\" *ngIf=\"updateForm.controls.mail.errors?.maxlength && updateForm.controls.mail.dirty\">30文字以内で入力してください</p>\n                <p class=\"text-danger small-text\" *ngIf=\"updateForm.controls.mail.errors?.email && updateForm.controls.mail.dirty\">メール形式で入力してください</p>\n            </div>\n\n            <div class=\"mb-small\">\n                <label class=\"control-label small-text\">せい</label>\n                <input type=\"text\" class=\"form-control\" name=\"familyName\" [formControl]=\"updateForm.controls.familyName\">\n                <p class=\"text-danger small-text\" *ngIf=\"updateForm.controls.familyName.errors?.required && updateForm.controls.familyName.dirty\">必須項目</p>\n                <p class=\"text-danger small-text\" *ngIf=\"updateForm.controls.familyName.errors?.maxlength && updateForm.controls.familyName.dirty\">10文字以内で入力してください</p>\n                <p class=\"text-danger small-text\" *ngIf=\"updateForm.controls.familyName.errors?.pattern && updateForm.controls.familyName.dirty\">ひらがなで入力してください</p>\n            </div>\n\n            <div class=\"mb-small\">\n                <label class=\"control-label small-text\">めい</label>\n                <input type=\"text\" class=\"form-control\" name=\"givenName\" [formControl]=\"updateForm.controls.givenName\">\n                <p class=\"text-danger small-text\" *ngIf=\"updateForm.controls.givenName.errors?.required && updateForm.controls.givenName.dirty\">必須項目</p>\n                <p class=\"text-danger small-text\" *ngIf=\"updateForm.controls.givenName.errors?.maxlength && updateForm.controls.givenName.dirty\">10文字以内で入力してください</p>\n                <p class=\"text-danger small-text\" *ngIf=\"updateForm.controls.givenName.errors?.pattern && updateForm.controls.givenName.dirty\">ひらがなで入力してください</p>\n            </div>\n\n            <div class=\"mb-small\">\n                <label class=\"control-label small-text\">電話番号</label>\n                <input type=\"tel\" class=\"form-control\" name=\"telephone\" [formControl]=\"updateForm.controls.telephone\">\n                <p class=\"text-danger small-text\" *ngIf=\"updateForm.controls.telephone.errors?.required && updateForm.controls.telephone.dirty\">必須項目</p>\n                <p class=\"text-danger small-text\" *ngIf=\"updateForm.controls.telephone.errors?.maxlength && updateForm.controls.telephone.dirty\">15文字以内で入力してください</p>\n                <p class=\"text-danger small-text\" *ngIf=\"updateForm.controls.telephone.errors?.pattern && updateForm.controls.telephone.dirty\">数字で入力してください</p>\n            </div>\n\n            <button [disabled]=\"updateForm.invalid\" type=\"submit\" class=\"btn btn-primary btn-block btn-bottom\">更新</button>\n        </form>\n    </div>\n</div>\n\n<app-loading *ngIf=\"isLoading\"></app-loading>"

/***/ }),

/***/ "../../../../../src/app/components/profile/profile.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".inner {\n  padding-top: 40px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/profile/profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_sasaki_sasaki_service__ = __webpack_require__("../../../../../src/app/service/sasaki/sasaki.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_user_user_service__ = __webpack_require__("../../../../../src/app/service/user/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * ProfileComponent
 */




var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(formBuilder, user, sasaki) {
        this.formBuilder = formBuilder;
        this.user = user;
        this.sasaki = sasaki;
        console.log('LoginComponent constructor');
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.isLoading = false;
        this.updateForm = this.formBuilder.group({
            mail: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](this.user.contacts.email, [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].maxLength(30),
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].email
            ]),
            givenName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](this.user.contacts.givenName, [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].maxLength(10),
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].pattern(/^[ぁ-ゞー]+$/)
            ]),
            familyName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](this.user.contacts.familyName, [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].maxLength(10),
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].pattern(/^[ぁ-ゞー]+$/)
            ]),
            telephone: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](this.user.contacts.telephone.replace(/\-/g, ''), [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].maxLength(15),
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].pattern(/^[0-9]+$/)
            ])
        });
    };
    ProfileComponent.prototype.submit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLoading = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.sasaki.people.updateContacts({
                                personId: 'me',
                                contacts: {
                                    email: this.updateForm.controls.mail.value,
                                    familyName: this.updateForm.controls.familyName.value,
                                    givenName: this.updateForm.controls.givenName.value,
                                    telephone: this.updateForm.controls.telephone.value
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.error('updateContacts 失敗', err_1);
                        return [3 /*break*/, 4];
                    case 4:
                        this.isLoading = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__("../../../../../src/app/components/profile/profile.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/profile/profile.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__service_user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__service_user_user_service__["a" /* UserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__service_sasaki_sasaki_service__["a" /* SasakiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_sasaki_sasaki_service__["a" /* SasakiService */]) === "function" && _c || Object])
    ], ProfileComponent);
    return ProfileComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=profile.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/purchase/chronological-order/chronological-order.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  chronological-order-of-performance works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/components/purchase/chronological-order/chronological-order.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/purchase/chronological-order/chronological-order.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChronologicalOrderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * ChronologicalOrderComponent
 */

var ChronologicalOrderComponent = /** @class */ (function () {
    function ChronologicalOrderComponent() {
    }
    ChronologicalOrderComponent.prototype.ngOnInit = function () {
    };
    ChronologicalOrderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-chronological-order',
            template: __webpack_require__("../../../../../src/app/components/purchase/chronological-order/chronological-order.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/purchase/chronological-order/chronological-order.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ChronologicalOrderComponent);
    return ChronologicalOrderComponent;
}());

//# sourceMappingURL=chronological-order.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/purchase/film-order/film-order.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"inner\">\n    <div class=\"info\">\n        <p class=\"title mb-x-small\">{{ filmInfo.workPerformed.name }}</p>\n        <div class=\"date small-text icon-time-gray\">{{ filmInfo.workPerformed.duration | duration:'minutes' }}分</div>\n    </div>\n    <ul>\n        <li *ngFor=\"let film of data.films\" [class]=\"(film.offer.availability | availability).string\" (click)=\"performanceSelect(film)\">\n            <p class=\"mb-x-small text-center\">\n                <strong class=\"large-text\">{{ film.startDate | timeFormat: film.coaInfo.dateJouei }}</strong><br>\n                <span>～ {{ film.endDate | timeFormat: film.coaInfo.dateJouei }}</span>\n            </p>\n            <div class=\"screen text-center\">{{ film.location.name.ja }}</div>\n            <div class=\"status\"><img [src]=\"'/assets/images/purchase/' + (film.offer.availability | availability).image\"></div>\n        </li>\n    </ul>\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/purchase/film-order/film-order.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".inner {\n  display: block;\n  background-color: #FFF; }\n\n.info {\n  padding: 15px 10px;\n  color: #333;\n  background-color: #EEE;\n  border-bottom: 1px solid #AAA; }\n  .info .date {\n    opacity: 0.75; }\n    .info .date:before {\n      display: inline-block;\n      vertical-align: middle;\n      margin-right: 10px; }\n\nul {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  padding: 5px 5px 0; }\n  ul li {\n    width: calc(50% - 2.5px);\n    background-color: #0074A9;\n    padding: 10px;\n    margin: 0 0 5px;\n    position: relative; }\n    ul li .screen {\n      padding-right: 27px; }\n    ul li .status {\n      position: absolute;\n      bottom: 10px;\n      right: 10px; }\n      ul li .status img {\n        width: 20px;\n        height: 20px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/purchase/film-order/film-order.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilmOrderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * FilmOrderComponent
 */


var FilmOrderComponent = /** @class */ (function () {
    function FilmOrderComponent() {
    }
    FilmOrderComponent.prototype.ngOnInit = function () {
        this.filmInfo = this.data.films[0];
    };
    FilmOrderComponent.prototype.performanceSelect = function (data) {
        location.href = __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].ticketingSite + "/signIn?id=" + data.identifier;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], FilmOrderComponent.prototype, "data", void 0);
    FilmOrderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-film-order',
            template: __webpack_require__("../../../../../src/app/components/purchase/film-order/film-order.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/purchase/film-order/film-order.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], FilmOrderComponent);
    return FilmOrderComponent;
}());

//# sourceMappingURL=film-order.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/purchase/schedule/schedule.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"contents\">\n    <div class=\"inner\">\n        <p class=\"read mb-small\">鑑賞劇場、鑑賞作品、鑑賞日時を選択してください。</p>\n        <ul class=\"conditions mb-small\">\n            <li class=\" mb-x-small\">\n                <div class=\"control-label mb-x-small small-x-text\">鑑賞劇場</div>\n                <select class=\"form-control\" name=\"theater\" [(ngModel)]=\"theater\" (change)=\"changeConditions($event)\">\n                    <option *ngFor=\"let theater of theaters\" value=\"{{ theater.branchCode }}\">{{ theater.name.ja }}</option>\n                </select>\n            </li>\n            <li>\n                <div class=\"control-label mb-x-small small-x-text\">鑑賞日時</div>\n                <select class=\"form-control\" name=\"date\" [(ngModel)]=\"date\" (change)=\"changeConditions($event)\">\n                    <option *ngFor=\"let date of dateList\" value=\"{{ date.value }}\">{{ date.text }}</option>\n                </select>\n            </li>\n        </ul>\n\n        <swiper *ngIf=\"!isLoading\" [config]=\"config\">\n            <div class=\"swiper-wrapper\">\n                <div *ngFor=\"let film of filmList\" class=\"swiper-slide\">\n                    <app-film-order [data]=\"film\" (performanceSelect)=\"purchaseView($event)\"></app-film-order>\n                </div>\n            </div>\n        </swiper>\n        <div class=\"pagination-wrapper\">\n            <div class=\"swiper-pagination\"></div>\n        </div>\n    </div>\n</div>\n<app-loading *ngIf=\"isLoading\"></app-loading>"

/***/ }),

/***/ "../../../../../src/app/components/purchase/schedule/schedule.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "swiper {\n  margin: 0 -15px; }\n\n.swiper-slide {\n  padding: 0 15px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/purchase/schedule/schedule.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScheduleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_sasaki_sasaki_service__ = __webpack_require__("../../../../../src/app/service/sasaki/sasaki.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * ScheduleComponent
 */



/**
 * 販売終了時間 30分前
 */
var END_TIME = 30;
var ScheduleComponent = /** @class */ (function () {
    function ScheduleComponent(sasaki) {
        this.sasaki = sasaki;
    }
    ScheduleComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.isLoading = true;
                        this.config = {
                            pagination: '.swiper-pagination',
                            paginationClickable: true,
                            nextButton: '.swiper-button-next',
                            prevButton: '.swiper-button-prev',
                            spaceBetween: 30,
                            autoHeight: true
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        _a = this;
                        return [4 /*yield*/, this.sasaki.place.searchMovieTheaters()];
                    case 2:
                        _a.theaters = _b.sent();
                        this.theater = this.theaters[0].branchCode;
                        this.dateList = this.createDate();
                        this.date = this.dateList[0].value;
                        return [4 /*yield*/, this.fitchPerformances()];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _b.sent();
                        console.log(err_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleComponent.prototype.createDate = function () {
        var limit = 3;
        var results = [];
        for (var i = 0; i < limit; i += 1) {
            var date = __WEBPACK_IMPORTED_MODULE_1_moment__().add(i, 'day');
            results.push({
                value: date.format('YYYYMMDD'),
                text: (i === 0) ? '本日'
                    : (i === 1) ? '明日'
                        : (i === 2) ? '明後日'
                            : date.format('YYYY年MM月DD日')
            });
        }
        return results;
    };
    ScheduleComponent.prototype.changeConditions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fitchPerformances()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleComponent.prototype.fitchPerformances = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.theater === '') {
                            throw new Error('theater is required');
                        }
                        if (this.date === '') {
                            throw new Error('date  is required');
                        }
                        this.isLoading = true;
                        _a = this;
                        return [4 /*yield*/, this.sasaki.events.searchIndividualScreeningEvent({
                                theater: this.theater,
                                day: this.date
                            })];
                    case 1:
                        _a.individualScreeningEvents = _b.sent();
                        console.log('上映イベント検索', this.individualScreeningEvents);
                        this.chronologicalList = this.convertToChronologicalOrder(this.individualScreeningEvents);
                        this.filmList = this.convertToFilmOrder(this.individualScreeningEvents);
                        console.log('時間順', this.chronologicalList);
                        console.log('作品順', this.filmList);
                        this.isLoading = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 時間別へ変換
     * @function getTheaterCode
     * @param {sasaki.factory.event.individualScreeningEvent.IEventWithOffer[]} data
     * @returns {chronological[]}
     */
    ScheduleComponent.prototype.convertToChronologicalOrder = function (data) {
        var results = [];
        data.forEach(function (performance) {
            // 販売可能時間判定
            var limitTime = __WEBPACK_IMPORTED_MODULE_1_moment__().add(END_TIME, 'minutes');
            if (limitTime.unix() > __WEBPACK_IMPORTED_MODULE_1_moment__("" + performance.startDate).unix()) {
                return;
            }
            results.push(performance);
        });
        return results;
    };
    /**
     * 作品別へ変換
     * @function getTheaterCode
     * @param {sasaki.factory.event.individualScreeningEvent.IEventWithOffer[]} data
     * @returns {Ifilm[]}
     */
    ScheduleComponent.prototype.convertToFilmOrder = function (data) {
        var results = [];
        data.forEach(function (performance) {
            // 販売可能時間判定
            var limitTime = __WEBPACK_IMPORTED_MODULE_1_moment__().add(END_TIME, 'minutes');
            if (limitTime.unix() > __WEBPACK_IMPORTED_MODULE_1_moment__("" + performance.startDate).unix()) {
                return;
            }
            var film = results.find(function (event) {
                return (event.id === performance.workPerformed.identifier);
            });
            if (film === undefined) {
                results.push({
                    id: performance.workPerformed.identifier,
                    films: [performance]
                });
            }
            else {
                film.films.push(performance);
            }
        });
        return results;
    };
    ScheduleComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-schedule',
            template: __webpack_require__("../../../../../src/app/components/purchase/schedule/schedule.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/purchase/schedule/schedule.component.scss")]
        })
        /**
         * チケット購入
         * @class ScheduleComponent
         * @implements OnInit
         */
        ,
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__service_sasaki_sasaki_service__["a" /* SasakiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_sasaki_sasaki_service__["a" /* SasakiService */]) === "function" && _a || Object])
    ], ScheduleComponent);
    return ScheduleComponent;
    var _a;
}());

//# sourceMappingURL=schedule.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/ticket/no-ticket/no-ticket.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"position-center\">\n    <div class=\"mb-middle text-center\"><img src=\"/assets/images/ticket/no_ticket.svg\" width=\"103\" height=\"66\"></div>\n    <p class=\"mb-middle text-center\">現在鑑賞予定の作品はございません。</p>\n    <p class=\"text-center\"><a routerLink=\"/about\">このアプリについて</a></p>\n</div>\n<button class=\"btn btn-primary btn-block btn-bottom\" routerLink=\"/purchase\">チケットを購入</button>\n"

/***/ }),

/***/ "../../../../../src/app/components/ticket/no-ticket/no-ticket.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/ticket/no-ticket/no-ticket.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoTicketComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * NoTicketComponent
 */

var NoTicketComponent = /** @class */ (function () {
    function NoTicketComponent() {
    }
    NoTicketComponent.prototype.ngOnInit = function () {
    };
    NoTicketComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-no-ticket',
            template: __webpack_require__("../../../../../src/app/components/ticket/no-ticket/no-ticket.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/ticket/no-ticket/no-ticket.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], NoTicketComponent);
    return NoTicketComponent;
}());

//# sourceMappingURL=no-ticket.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/ticket/ticket-holder/ticket-holder.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"contents\">\n    <div class=\"inner\">\n        <p class=\"mb-small text-center\">購入した鑑賞作品の下記チケットのQRコードを<br>入場口スタッフに提示してください。</p>\n        <div *ngIf=\"!isLoading\">\n            <ng-template *ngIf=\"reservations?.length > 0; then ticketBlock else noTicketBlock\"></ng-template>\n        </div>\n    </div>\n</div>\n<app-loading *ngIf=\"isLoading\"></app-loading>\n\n<ng-template #ticketBlock>\n    <swiper [config]=\"config\">\n        <div class=\"swiper-wrapper\">\n            <div *ngFor=\"let reservation of reservations\" class=\"swiper-slide\">\n                <app-ticket [reservation]=\"reservation\"></app-ticket>\n            </div>\n        </div>\n    </swiper>\n    <div class=\"pagination-wrapper\">\n        <div class=\"swiper-pagination\"></div>\n    </div>\n</ng-template>\n\n<ng-template #noTicketBlock>\n    <app-no-ticket></app-no-ticket>\n</ng-template>\n"

/***/ }),

/***/ "../../../../../src/app/components/ticket/ticket-holder/ticket-holder.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "swiper {\n  margin: 0 -15px; }\n\n.swiper-slide {\n  padding: 0 15px; }\n\n.loading {\n  color: #FFF; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/ticket/ticket-holder/ticket-holder.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TicketHolderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_sasaki_sasaki_service__ = __webpack_require__("../../../../../src/app/service/sasaki/sasaki.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * TicketHolderComponent
 */


var TicketHolderComponent = /** @class */ (function () {
    function TicketHolderComponent(sasaki) {
        this.sasaki = sasaki;
    }
    TicketHolderComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.isLoading = true;
                        this.config = {
                            pagination: '.swiper-pagination',
                            paginationClickable: true,
                            autoHeight: true
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, this.sasaki.people.searchReservationOwnerships({
                                personId: 'me'
                            })];
                    case 2:
                        _a.reservationOwnerships = _b.sent();
                        this.reservations = this.convertToReservations();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        console.log(err_1);
                        this.reservations = [];
                        return [3 /*break*/, 4];
                    case 4:
                        this.isLoading = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 予約チケットリストへ変換
     * @method convertToReservations
     */
    TicketHolderComponent.prototype.convertToReservations = function () {
        var _this = this;
        var reservationsIdList = [];
        this.reservationOwnerships.forEach(function (reservationOwnership) {
            var reservationsId = reservationOwnership.typeOfGood.reservationFor.identifier;
            if (reservationsIdList.indexOf(reservationsId) === -1) {
                reservationsIdList.push(reservationsId);
            }
        });
        var reservations = reservationsIdList.map(function (reservationsId) {
            var reservationOwnerships = _this.reservationOwnerships.filter(function (reservationOwnership) {
                return (reservationOwnership.typeOfGood.reservationFor.identifier === reservationsId);
            });
            return {
                id: reservationsId,
                reservationFor: reservationOwnerships[0].typeOfGood.reservationFor,
                reservedTickets: reservationOwnerships.map(function (reservationOwnership) {
                    return reservationOwnership.typeOfGood.reservedTicket;
                })
            };
        });
        console.log('reservations:', reservations);
        return reservations;
    };
    TicketHolderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-ticket-holder',
            template: __webpack_require__("../../../../../src/app/components/ticket/ticket-holder/ticket-holder.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/ticket/ticket-holder/ticket-holder.component.scss")]
        })
        /**
         * チケットホルダー
         * @class TicketHolderComponent
         * @implements OnInit
         */
        ,
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_sasaki_sasaki_service__["a" /* SasakiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_sasaki_sasaki_service__["a" /* SasakiService */]) === "function" && _a || Object])
    ], TicketHolderComponent);
    return TicketHolderComponent;
    var _a;
}());

//# sourceMappingURL=ticket-holder.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/ticket/ticket/ticket.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"inner\">\n    <div class=\"info\">\n        <dl class=\"film\">\n            <dt class=\"icon-film-name-gray\"></dt>\n            <dd>{{ reservation.reservationFor.workPerformed.name }}</dd>\n        </dl>\n        <dl class=\"date\">\n            <dt class=\"icon-calendar-gray\"></dt>\n            <dd>{{ reservation.reservationFor.coaInfo.dateJouei | amLocal | amDateFormat: 'YYYY/MM/DD' }} {{ reservation.reservationFor.startDate\n                | timeFormat: reservation.reservationFor.coaInfo.dateJouei }}-{{ reservation.reservationFor.endDate | timeFormat:\n                reservation.reservationFor.coaInfo.dateJouei }}</dd>\n        </dl>\n        <dl class=\"theater\">\n            <dt class=\"icon-location-gray\"></dt>\n            <dd>{{ reservation.reservationFor.superEvent.location.name.ja }} / {{ reservation.reservationFor.location.name.ja }}</dd>\n        </dl>\n    </div>\n    <ul>\n        <li *ngFor=\"let reservedTicket of reservation.reservedTickets\">\n            <div class=\"ticket-info\">\n                <div class=\"large-x-text mb-x-small\">{{ reservedTicket.ticketedSeat.seatNumber }}</div>\n                <div *ngIf=\"reservedTicket.coaTicketInfo.addGlasses > 0\">{{ reservedTicket.coaTicketInfo.ticketName }}メガネ込み</div>\n                <div *ngIf=\"reservedTicket.coaTicketInfo.addGlasses === 0\">{{ reservedTicket.coaTicketInfo.ticketName }}</div>\n            </div>\n            <div class=\"qr\">\n                <qr-code [value]=\"reservedTicket.ticketToken\" [size]=\"100\"></qr-code>\n            </div>\n        </li>\n    </ul>\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/ticket/ticket/ticket.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".inner {\n  background-color: #EEE;\n  color: #333; }\n\n.info dl {\n  border-bottom: 1px solid #AAA;\n  display: table;\n  width: 100%; }\n  .info dl dt {\n    width: 60px;\n    text-align: center;\n    display: table-cell;\n    vertical-align: middle; }\n    .info dl dt:before {\n      margin: 0 auto; }\n  .info dl dd {\n    width: calc(100% - 60px);\n    padding: 15px 0;\n    display: table-cell;\n    vertical-align: middle;\n    line-height: 1.4; }\n\nul li {\n  background-color: #FFF;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-bottom: 1px solid #AAA; }\n  ul li:last-child {\n    border-bottom: none; }\n  ul li .ticket-info {\n    text-align: center;\n    width: calc(100% - 150px); }\n  ul li .qr {\n    padding: 10px;\n    background-color: #EEE; }\n    ul li .qr qr-code {\n      display: block;\n      padding: 10px;\n      background-color: #FFF; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/ticket/ticket/ticket.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TicketComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * TicketComponent
 */

var TicketComponent = /** @class */ (function () {
    function TicketComponent() {
    }
    TicketComponent.prototype.ngOnInit = function () {
        console.log('app-ticket', this.reservation);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], TicketComponent.prototype, "reservation", void 0);
    TicketComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-ticket',
            template: __webpack_require__("../../../../../src/app/components/ticket/ticket/ticket.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/ticket/ticket/ticket.component.scss")]
        })
        /**
         * チケット
         * @class TicketComponent
         * @implements OnInit
         */
        ,
        __metadata("design:paramtypes", [])
    ], TicketComponent);
    return TicketComponent;
}());

//# sourceMappingURL=ticket.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/walk-through/walk-through.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"walk-through-wrapper\">\n    <swiper [config]=\"config\">\n        <div class=\"swiper-wrapper walk-through\">\n            <div class=\"swiper-slide step-1\">\n                <div class=\"inner\">\n                    <p class=\"text-center large-text mb-middle\"><strong>シネマサンシャイン<br>公式アプリへようこそ!</strong></p>\n                    <div class=\"image text-center mb-middle\"><img src=\"/assets/images/walkThrough/01.svg\" width=\"118\" height=\"202\"></div>\n                </div>\n            </div>\n            <div class=\"swiper-slide step-2\">\n                <div class=\"inner\">\n                    <p class=\"text-center large-text mb-middle\"><strong>いつでも<br><span class=\"under-line\">アプリ会員価格！</span></strong></p>\n                    <div class=\"image text-center mb-middle\"><img src=\"/assets/images/walkThrough/02.svg\" width=\"118\" height=\"202\"></div>\n                    <p class=\"text-center mb-middle\">お得なアプリ会員価格で<br>チケットが購入できます。</p>\n                </div>\n            </div>\n            <div class=\"swiper-slide step-3\">\n                <div class=\"inner\">\n                    <p class=\"text-center large-text mb-middle\"><strong>チケットを<br><span class=\"under-line\">スマートに購入！</span></strong></p>\n                    <div class=\"image text-center mb-middle\"><img src=\"/assets/images/walkThrough/03.svg\" width=\"118\" height=\"202\"></div>\n                    <p class=\"text-center mb-middle\">一度、アプリ内で購入すると<br>面倒な購入者情報入力をスキップできます。</p>\n                </div>\n            </div>\n            <div class=\"swiper-slide step-4\">\n                <div class=\"inner\">\n                    <p class=\"text-center large-text mb-middle\"><strong>スマートフォンを<br><span class=\"under-line\">そのままチケットに！</span></strong></p>\n                    <div class=\"image text-center mb-middle\"><img src=\"/assets/images/walkThrough/04.svg\" width=\"274\" height=\"223\"></div>\n                    <p class=\"text-center mb-middle\">チケット発券の手間いらず。<br>アプリの画面を見せるだけで入場できます。</p>\n                </div>\n            </div>\n            <!-- <div class=\"swiper-slide step-5\">\n                <div class=\"inner\">\n                    <p class=\"text-center large-text mb-middle\"><strong>アプリでチケットを<br><span class=\"under-line\">6枚購入すると1枚無料！</span></strong></p>\n                    <div class=\"image text-center mb-middle\"><img src=\"/assets/images/walkThrough/06.svg\" width=\"118\" height=\"202\"></div>\n                    <p class=\"text-center mb-middle\">アプリ内で6枚購入すると<br>なんと1枚無料になります。</p>\n                </div>\n            </div> -->\n            <div class=\"swiper-slide step-5\">\n                <div class=\"inner\">\n                    <p class=\"text-center large-text mb-middle\"><strong>それではアプリを<br>お楽しみください！</strong></p>\n                    <div class=\"image text-center mb-middle\"><img src=\"/assets/images/walkThrough/05.svg\" width=\"269\" height=\"241\"></div>\n                    <button class=\"btn btn-primary btn-block\" routerLink=\"/auth/signUp\">アプリを始める</button>\n                </div>\n            </div>\n        </div>\n        <div class=\"swiper-pagination\"></div>\n    </swiper>\n</div>\n\n<app-loading *ngIf=\"isLoading\"></app-loading>"

/***/ }),

/***/ "../../../../../src/app/components/walk-through/walk-through.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".walk-through-wrapper {\n  background: linear-gradient(135deg, #00a0e9 0%, #00216b 100%); }\n\n.inner {\n  position: relative;\n  width: 100vw;\n  height: 100vh;\n  padding: 50px 20px; }\n\n.under-line {\n  border-bottom: 4px solid #F4D600; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/walk-through/walk-through.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WalkThroughComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_sasaki_sasaki_service__ = __webpack_require__("../../../../../src/app/service/sasaki/sasaki.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * WalkThroughComponent
 */



var WalkThroughComponent = /** @class */ (function () {
    function WalkThroughComponent(sasaki, router) {
        this.sasaki = sasaki;
        this.router = router;
    }
    WalkThroughComponent.prototype.ngOnInit = function () {
        this.isLoading = false;
        this.step = 0;
        this.walkThrough = false;
        this.config = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            spaceBetween: 30
        };
        this.tutorialStart();
    };
    WalkThroughComponent.prototype.tutorialStart = function () {
        var _this = this;
        var timeout = 3000;
        setTimeout(function () {
            _this.step = 1;
            _this.walkThrough = true;
        }, timeout);
    };
    WalkThroughComponent.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.sasaki.auth.signIn()];
                    case 1:
                        result = _a.sent();
                        console.log('authorize result:', result);
                        this.sasaki.credentials = result;
                        this.isLoading = true;
                        this.router.navigate(['/']);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        this.isLoading = false;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    WalkThroughComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-walk-through',
            template: __webpack_require__("../../../../../src/app/components/walk-through/walk-through.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/walk-through/walk-through.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__service_sasaki_sasaki_service__["a" /* SasakiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_sasaki_sasaki_service__["a" /* SasakiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
    ], WalkThroughComponent);
    return WalkThroughComponent;
    var _a, _b;
}());

//# sourceMappingURL=walk-through.component.js.map

/***/ }),

/***/ "../../../../../src/app/pipe/availability/availability.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AvailabilityPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * AvailabilityPipe
 */

var AvailabilityPipe = /** @class */ (function () {
    function AvailabilityPipe() {
    }
    AvailabilityPipe.prototype.transform = function (value) {
        var availability = [
            {
                symbol: '×',
                image: 'status_03.svg',
                string: 'full'
            },
            {
                symbol: '△',
                image: 'status_02.svg',
                string: 'little'
            },
            {
                symbol: '○',
                image: 'status_01.svg',
                string: 'large'
            }
        ];
        return (value === 0)
            ? availability[0] : (value <= 10)
            ? availability[1] : availability[2];
    };
    AvailabilityPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'availability'
        })
    ], AvailabilityPipe);
    return AvailabilityPipe;
}());

//# sourceMappingURL=availability.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/pipe/duration/duration.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DurationPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * DurationPipe
 */


var DurationPipe = /** @class */ (function () {
    function DurationPipe() {
    }
    DurationPipe.prototype.transform = function (value, format) {
        var result;
        switch (format) {
            case 'milliseconds':
                result = __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](value).asMilliseconds();
                break;
            case 'seconds':
                result = __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](value).asSeconds();
                break;
            case 'minutes':
                result = __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](value).asMinutes();
                break;
            case 'hours':
                result = __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](value).asHours();
                break;
            case 'days':
                result = __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](value).asDays();
                break;
            case 'weeks':
                result = __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](value).asWeeks();
                break;
            case 'months':
                result = __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](value).asMonths();
                break;
            case 'years':
                result = __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](value).asYears();
                break;
            default:
                result = __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](value).asMilliseconds();
                break;
        }
        return result;
    };
    DurationPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'duration'
        })
    ], DurationPipe);
    return DurationPipe;
}());

//# sourceMappingURL=duration.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/pipe/time-format/time-format.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimeFormatPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * TimeFormatPipe
 */


var TimeFormatPipe = /** @class */ (function () {
    function TimeFormatPipe() {
    }
    /**
     * 時間変換
     * @method transform
     * @param {Date} screeningTime
     * @param {string} referenceDate
     */
    TimeFormatPipe.prototype.transform = function (screeningTime, referenceDate) {
        var HOUR = 60;
        var DIGITS = -2;
        var diff = __WEBPACK_IMPORTED_MODULE_1_moment__(screeningTime).diff(__WEBPACK_IMPORTED_MODULE_1_moment__(referenceDate), 'minutes');
        var hour = ("00" + Math.floor(diff / HOUR)).slice(DIGITS);
        var minutes = __WEBPACK_IMPORTED_MODULE_1_moment__(screeningTime).format('mm');
        return hour + ":" + minutes;
    };
    TimeFormatPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'timeFormat'
        })
    ], TimeFormatPipe);
    return TimeFormatPipe;
}());

//# sourceMappingURL=time-format.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/service/auth-guard/auth-guard.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuardService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_sasaki_sasaki_service__ = __webpack_require__("../../../../../src/app/service/sasaki/sasaki.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_user_user_service__ = __webpack_require__("../../../../../src/app/service/user/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * AuthGuardService
 */




var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(sasaki, router, user) {
        this.sasaki = sasaki;
        this.router = router;
        this.user = user;
    }
    AuthGuardService.prototype.canActivate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isSignedIn, err_1, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log('canActivate');
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.sasaki.auth.isSignedIn()];
                    case 2:
                        isSignedIn = _c.sent();
                        console.log('isSignedIn', isSignedIn);
                        if (isSignedIn === null) {
                            throw new Error('isSignedIn is null');
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _c.sent();
                        console.log('非ログイン', err_1);
                        this.router.navigate(['/auth']);
                        return [2 /*return*/, false];
                    case 4:
                        if (!(this.user.contacts === undefined)) return [3 /*break*/, 6];
                        _a = this.user;
                        return [4 /*yield*/, this.sasaki.people.getContacts({
                                personId: 'me'
                            })];
                    case 5:
                        _a.contacts = _c.sent();
                        _c.label = 6;
                    case 6:
                        if (!(this.user.creditCards === undefined)) return [3 /*break*/, 8];
                        _b = this.user;
                        return [4 /*yield*/, this.sasaki.people.findCreditCards({
                                personId: 'me'
                            })];
                    case 7:
                        _b.creditCards = _c.sent();
                        _c.label = 8;
                    case 8: return [2 /*return*/, true];
                }
            });
        });
    };
    AuthGuardService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__service_sasaki_sasaki_service__["a" /* SasakiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_sasaki_sasaki_service__["a" /* SasakiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__service_user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__service_user_user_service__["a" /* UserService */]) === "function" && _c || Object])
    ], AuthGuardService);
    return AuthGuardService;
    var _a, _b, _c;
}());

//# sourceMappingURL=auth-guard.service.js.map

/***/ }),

/***/ "../../../../../src/app/service/cognito/cognito.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CognitoUtil; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_amazon_cognito_identity_js__ = __webpack_require__("../../../../amazon-cognito-identity-js/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_aws_sdk_clients_cognitoidentity__ = __webpack_require__("../../../../aws-sdk/clients/cognitoidentity.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_aws_sdk_clients_cognitoidentity___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_aws_sdk_clients_cognitoidentity__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_aws_sdk_global__ = __webpack_require__("../../../../aws-sdk/browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_aws_sdk_global___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_aws_sdk_global__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var CognitoUtil = /** @class */ (function () {
    function CognitoUtil() {
    }
    CognitoUtil_1 = CognitoUtil;
    // tslint:disable-next-line:function-name
    CognitoUtil.getCognitoParametersForIdConsolidation = function (idTokenJwt) {
        console.log('AwsUtil: enter getCognitoParametersForIdConsolidation()');
        var url = "cognito-idp." + CognitoUtil_1._REGION.toLowerCase() + ".amazonaws.com/" + CognitoUtil_1._USER_POOL_ID;
        var logins = {};
        logins[url] = idTokenJwt;
        return {
            IdentityPoolId: CognitoUtil_1._IDENTITY_POOL_ID,
            Logins: logins
        };
    };
    CognitoUtil.prototype.getUserPool = function (clientId) {
        var cognitoUserPoolData = CognitoUtil_1._POOL_DATA;
        // if (environment.cognito_idp_endpoint) {
        //     cognitoUserPoolData.endpoint = environment.cognito_idp_endpoint;
        // }
        if (clientId !== undefined) {
            cognitoUserPoolData.ClientId = clientId;
        }
        console.log('new CognitoUserPool...', cognitoUserPoolData);
        return new __WEBPACK_IMPORTED_MODULE_1_amazon_cognito_identity_js__["d" /* CognitoUserPool */](cognitoUserPoolData);
    };
    CognitoUtil.prototype.getCurrentUser = function (clientId) {
        return this.getUserPool(clientId).getCurrentUser();
    };
    // AWS Stores Credentials in many ways, and with TypeScript this means that
    // getting the base credentials we authenticated with from the AWS globals gets really murky,
    // having to get around both class extension and unions. Therefore, we're going to give
    // developers direct access to the raw, unadulterated CognitoIdentityCredentials
    // object at all times.
    CognitoUtil.prototype.setCognitoCreds = function (creds) {
        this.cognitoCreds = creds;
    };
    CognitoUtil.prototype.getCognitoCreds = function () {
        return this.cognitoCreds;
    };
    /**
     * ローカルセッションに認証情報を作成する
     */
    CognitoUtil.prototype.buildCognitoCreds = function (logins) {
        return __awaiter(this, void 0, void 0, function () {
            var params, creds;
            return __generator(this, function (_a) {
                console.log('logins:', logins);
                this.logins = logins;
                params = {
                    IdentityPoolId: CognitoUtil_1._IDENTITY_POOL_ID,
                    Logins: logins
                };
                creds = new __WEBPACK_IMPORTED_MODULE_3_aws_sdk_global__["CognitoIdentityCredentials"](params);
                console.log('creds:', creds);
                this.setCognitoCreds(creds);
                // const getCredentialsForIdentityResponse = await cognitoIdentity.getCredentialsForIdentity({
                //     IdentityId: getIdResponse.IdentityId,
                //     Logins: logins
                // }).promise();
                // console.log('getCredentialsForIdentityResponse:', getCredentialsForIdentityResponse);
                return [2 /*return*/, creds];
            });
        });
    };
    /**
     * cognito identity idを取得する
     */
    CognitoUtil.prototype.getCognitoIdentity = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cognitoIdentity, getIdResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.logins === undefined) {
                            return [2 /*return*/, null];
                        }
                        cognitoIdentity = new __WEBPACK_IMPORTED_MODULE_2_aws_sdk_clients_cognitoidentity__();
                        return [4 /*yield*/, cognitoIdentity.getId({
                                IdentityPoolId: CognitoUtil_1._IDENTITY_POOL_ID,
                                Logins: this.logins
                            }).promise()];
                    case 1:
                        getIdResponse = _a.sent();
                        console.log('getIdResponse:', getIdResponse);
                        return [2 /*return*/, getIdResponse.IdentityId];
                }
            });
        });
    };
    CognitoUtil.prototype.getAccessToken = function (clientId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log('アクセストークンを取得します...');
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (_this.getCurrentUser(clientId) != null) {
                            _this.getCurrentUser(clientId).getSession(function (err, session) {
                                if (err) {
                                    console.log('CognitoUtil: Can\'t set the credentials', err);
                                    reject(err);
                                }
                                else {
                                    if (session.isValid()) {
                                        console.log('アクセストークンを取得しました', session.getAccessToken());
                                        resolve(session.getAccessToken().getJwtToken());
                                    }
                                    else {
                                        reject(new Error('invalid session'));
                                    }
                                }
                            });
                        }
                        else {
                            resolve(null);
                        }
                    })];
            });
        });
    };
    CognitoUtil.prototype.getOpenIdToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cognitoIdentity, getOpenIdTokenResponse, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        console.log('OpenIDトークンを取得します...');
                        cognitoIdentity = new __WEBPACK_IMPORTED_MODULE_2_aws_sdk_clients_cognitoidentity__();
                        _b = (_a = cognitoIdentity).getOpenIdToken;
                        _c = {};
                        return [4 /*yield*/, this.getCognitoIdentity()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [(_c.IdentityId = _d.sent(),
                                _c.Logins = this.logins,
                                _c)]).promise()];
                    case 2:
                        getOpenIdTokenResponse = _d.sent();
                        console.log('OpenIDトークンを取得しました', getOpenIdTokenResponse);
                        return [2 /*return*/, getOpenIdTokenResponse.Token];
                }
            });
        });
    };
    CognitoUtil.prototype.getIdToken = function (clientId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log('IDトークンを取得します...clientId:', clientId);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (_this.getCurrentUser(clientId) != null) {
                            _this.getCurrentUser(clientId).getSession(function (err, session) {
                                if (err) {
                                    console.log('CognitoUtil: Can\'t set the credentials', err);
                                    resolve(null);
                                }
                                else {
                                    if (session.isValid()) {
                                        console.log('IDトークンを取得しました', session.getIdToken());
                                        resolve(session.getIdToken().getJwtToken());
                                    }
                                    else {
                                        console.log('CognitoUtil: Got the id token, but the session isn\'t valid');
                                        reject(new Error('invalid session'));
                                    }
                                }
                            });
                        }
                        else {
                            reject(new Error('current user null'));
                        }
                    })];
            });
        });
    };
    CognitoUtil.prototype.getRefreshToken = function (clientId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (_this.getCurrentUser(clientId) != null) {
                            _this.getCurrentUser(clientId).getSession(function (err, session) {
                                if (err) {
                                    console.log('CognitoUtil: Can\'t set the credentials', err);
                                    reject(err);
                                }
                                else {
                                    if (session.isValid()) {
                                        resolve(session.getRefreshToken());
                                    }
                                }
                            });
                        }
                        else {
                            resolve(null);
                        }
                    })];
            });
        });
    };
    CognitoUtil.prototype.refresh = function (clientId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.getCurrentUser(clientId).getSession(function (err, session) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (err) {
                                    console.log('CognitoUtil: Can\'t set the credentials', err);
                                    reject(err);
                                }
                                else {
                                    if (session.isValid()) {
                                        console.log('CognitoUtil: refreshed successfully');
                                        resolve();
                                    }
                                    else {
                                        console.log('CognitoUtil: refreshed but session is still not valid');
                                        reject(new Error('CognitoUtil: refreshed but session is still not valid'));
                                    }
                                }
                                return [2 /*return*/];
                            });
                        }); });
                    })];
            });
        });
    };
    CognitoUtil._REGION = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].region;
    CognitoUtil._IDENTITY_POOL_ID = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].identityPoolId;
    CognitoUtil._USER_POOL_ID = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].userPoolId;
    CognitoUtil._CLIENT_ID = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].clientId;
    CognitoUtil._POOL_DATA = {
        UserPoolId: CognitoUtil_1._USER_POOL_ID,
        ClientId: CognitoUtil_1._CLIENT_ID
    };
    CognitoUtil = CognitoUtil_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], CognitoUtil);
    return CognitoUtil;
    var CognitoUtil_1;
}());

//# sourceMappingURL=cognito.service.js.map

/***/ }),

/***/ "../../../../../src/app/service/sasaki/sasaki.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SasakiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__motionpicture_sskts_api_javascript_client__ = __webpack_require__("../../../../@motionpicture/sskts-api-javascript-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__motionpicture_sskts_api_javascript_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__motionpicture_sskts_api_javascript_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * SasakiService
 */



var SasakiService = /** @class */ (function () {
    function SasakiService() {
        this.credentials = null;
        var scopes = [
            'phone', 'openid', 'email', 'aws.cognito.signin.user.admin', 'profile',
            'https://sskts-api-development.azurewebsites.net/transactions',
            'https://sskts-api-development.azurewebsites.net/events.read-only',
            'https://sskts-api-development.azurewebsites.net/organizations.read-only',
            'https://sskts-api-development.azurewebsites.net/people.contacts',
            'https://sskts-api-development.azurewebsites.net/people.creditCards',
            'https://sskts-api-development.azurewebsites.net/people.ownershipInfos.read-only',
            'https://sskts-api-development.azurewebsites.net/places.read-only'
        ];
        var options = {
            domain: __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].sasakiAuthDomain,
            clientId: __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].clientId,
            responseType: 'token',
            redirectUri: __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].sasakiAuthRedirectUri,
            logoutUri: __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].sasakiAuthLogoutUri,
            scope: scopes.join(' '),
            state: '12345',
            nonce: null,
            tokenIssuer: __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].tokenIssuer
        };
        console.log('options-----', options, process);
        this.auth = __WEBPACK_IMPORTED_MODULE_1__motionpicture_sskts_api_javascript_client__["createAuthInstance"](options);
        this.people = new __WEBPACK_IMPORTED_MODULE_1__motionpicture_sskts_api_javascript_client__["service"].Person({
            auth: this.auth,
            endpoint: __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].sasakiAPIEndpoint
        });
        this.events = new __WEBPACK_IMPORTED_MODULE_1__motionpicture_sskts_api_javascript_client__["service"].Event({
            auth: this.auth,
            endpoint: __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].sasakiAPIEndpoint
        });
        this.place = new __WEBPACK_IMPORTED_MODULE_1__motionpicture_sskts_api_javascript_client__["service"].Place({
            auth: this.auth,
            endpoint: __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].sasakiAPIEndpoint
        });
    }
    SasakiService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], SasakiService);
    return SasakiService;
}());

//# sourceMappingURL=sasaki.service.js.map
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../../../../process/browser.js")))

/***/ }),

/***/ "../../../../../src/app/service/user-login/user-login.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserLoginService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_amazon_cognito_identity_js__ = __webpack_require__("../../../../amazon-cognito-identity-js/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_aws_sdk_clients_sts__ = __webpack_require__("../../../../aws-sdk/clients/sts.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_aws_sdk_clients_sts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_aws_sdk_clients_sts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_aws_sdk_global__ = __webpack_require__("../../../../aws-sdk/browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_aws_sdk_global___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_aws_sdk_global__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cognito_cognito_service__ = __webpack_require__("../../../../../src/app/service/cognito/cognito.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






/**
 * 会員ログインサービス
 */
var UserLoginService = /** @class */ (function () {
    function UserLoginService(cognitoUtil) {
        this.cognitoUtil = cognitoUtil;
    }
    /**
     * ユーザーネームとパスワードで認証する
     * @param username ユーザーネーム
     * @param password パスワード
     */
    UserLoginService.prototype.authenticate = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        console.log('UserLoginService: starting the authentication');
                        var authenticationData = {
                            Username: username,
                            Password: password
                        };
                        var authenticationDetails = new __WEBPACK_IMPORTED_MODULE_1_amazon_cognito_identity_js__["a" /* AuthenticationDetails */](authenticationData);
                        var userData = {
                            Username: username,
                            Pool: _this.cognitoUtil.getUserPool()
                        };
                        console.log('UserLoginService: Params set...Authenticating the user');
                        var cognitoUser = new __WEBPACK_IMPORTED_MODULE_1_amazon_cognito_identity_js__["b" /* CognitoUser */](userData);
                        console.log("UserLoginService: config is " + __WEBPACK_IMPORTED_MODULE_3_aws_sdk_global__["config"]);
                        cognitoUser.authenticateUser(authenticationDetails, {
                            newPasswordRequired: function (userAttributes, requiredAttributes) {
                                console.log('userAttributes', userAttributes);
                                console.log('requiredAttributes', requiredAttributes);
                                resolve({
                                    message: 'User needs to set password.',
                                    result: null
                                });
                            },
                            onSuccess: function (result) { return __awaiter(_this, void 0, void 0, function () {
                                var creds, clientParams, sts;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            console.log('In authenticateUser onSuccess callback');
                                            return [4 /*yield*/, this.cognitoUtil.buildCognitoCreds(__WEBPACK_IMPORTED_MODULE_5__cognito_cognito_service__["a" /* CognitoUtil */].getCognitoParametersForIdConsolidation(result.getIdToken().getJwtToken()).Logins)];
                                        case 1:
                                            creds = _a.sent();
                                            __WEBPACK_IMPORTED_MODULE_3_aws_sdk_global__["config"].credentials = creds;
                                            clientParams = {};
                                            if (__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].sts_endpoint) {
                                                clientParams.endpoint = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].sts_endpoint;
                                            }
                                            sts = new __WEBPACK_IMPORTED_MODULE_2_aws_sdk_clients_sts__(clientParams);
                                            sts.getCallerIdentity({}, function (err, data) {
                                                console.log('UserLoginService: Successfully set the AWS credentials');
                                                console.log(err, data);
                                                resolve({
                                                    message: null,
                                                    result: result
                                                });
                                            });
                                            return [2 /*return*/];
                                    }
                                });
                            }); },
                            onFailure: function (err) {
                                resolve({
                                    message: err.message,
                                    result: null
                                });
                            }
                        });
                    })];
            });
        });
    };
    /**
     * ユーザーネームからパスワード忘れプロセスを実行する
     * @param username ユーザーネーム
     * @param callback 実行後処理
     */
    UserLoginService.prototype.forgotPassword = function (username, callback) {
        var userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };
        var cognitoUser = new __WEBPACK_IMPORTED_MODULE_1_amazon_cognito_identity_js__["b" /* CognitoUser */](userData);
        cognitoUser.forgotPassword({
            onSuccess: function () {
            },
            onFailure: function (err) {
                callback.cognitoCallback(err.message, null);
            },
            inputVerificationCode: function () {
                callback.cognitoCallback(null, null);
            }
        });
    };
    /**
     * 新パスワードを登録する
     * @param username ユーザーネーム
     * @param verificationCode 確認コード
     * @param password 新パスワード
     * @param callback 実行後処理
     */
    UserLoginService.prototype.confirmNewPassword = function (username, verificationCode, password, callback) {
        var userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };
        var cognitoUser = new __WEBPACK_IMPORTED_MODULE_1_amazon_cognito_identity_js__["b" /* CognitoUser */](userData);
        cognitoUser.confirmPassword(verificationCode, password, {
            onSuccess: function () {
                callback.cognitoCallback(null, null);
            },
            onFailure: function (err) {
                callback.cognitoCallback(err.message, null);
            }
        });
    };
    /**
     * ログアウト
     */
    UserLoginService.prototype.logout = function () {
        console.log('UserLoginService: Logging out');
        this.cognitoUtil.getCurrentUser().signOut();
    };
    /**
     * 認証済かどうか
     */
    UserLoginService.prototype.isAuthenticated = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var cognitoUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (callback == null) {
                            throw new Error('UserLoginService: Callback in isAuthenticated() cannot be null');
                        }
                        cognitoUser = this.cognitoUtil.getCurrentUser();
                        if (!(cognitoUser != null)) return [3 /*break*/, 1];
                        cognitoUser.getSession(function (err, session) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!err) return [3 /*break*/, 2];
                                        console.log('UserLoginService: Couldn\'t get the session', err, err.stack);
                                        return [4 /*yield*/, callback.isLoggedIn(err, false)];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 2:
                                        console.log("UserLoginService: Session is " + session.isValid());
                                        return [4 /*yield*/, callback.isLoggedIn(err, session.isValid())];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [3 /*break*/, 3];
                    case 1:
                        console.log('UserLoginService: can\'t retrieve the current user');
                        return [4 /*yield*/, callback.isLoggedIn('Can\'t retrieve the CurrentUser', false)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserLoginService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__cognito_cognito_service__["a" /* CognitoUtil */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__cognito_cognito_service__["a" /* CognitoUtil */]) === "function" && _a || Object])
    ], UserLoginService);
    return UserLoginService;
    var _a;
}());

//# sourceMappingURL=user-login.service.js.map

/***/ }),

/***/ "../../../../../src/app/service/user-parameters/user-parameters.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserParametersService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cognito_cognito_service__ = __webpack_require__("../../../../../src/app/service/cognito/cognito.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * UserParametersService
 */


var UserParametersService = /** @class */ (function () {
    function UserParametersService(cognitoUtil) {
        this.cognitoUtil = cognitoUtil;
    }
    UserParametersService.prototype.getParameters = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var cognitoUser = _this.cognitoUtil.getCurrentUser();
                        if (cognitoUser != null) {
                            cognitoUser.getSession(function (getSessionErr, session) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (getSessionErr) {
                                        console.log('UserParametersService: Couldn\'t retrieve the user');
                                        reject(getSessionErr);
                                    }
                                    else {
                                        console.log(session);
                                        cognitoUser.getUserAttributes(function (getUserAttributesErr, result) {
                                            if (getUserAttributesErr) {
                                                var message = "UserParametersService: in getParameters " + getUserAttributesErr;
                                                console.log(message);
                                                reject(new Error(message));
                                            }
                                            else {
                                                resolve(result);
                                            }
                                        });
                                    }
                                    return [2 /*return*/];
                                });
                            }); });
                        }
                        else {
                            resolve(null);
                        }
                    })];
            });
        });
    };
    UserParametersService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__cognito_cognito_service__["a" /* CognitoUtil */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__cognito_cognito_service__["a" /* CognitoUtil */]) === "function" && _a || Object])
    ], UserParametersService);
    return UserParametersService;
    var _a;
}());

//# sourceMappingURL=user-parameters.service.js.map

/***/ }),

/***/ "../../../../../src/app/service/user-registration/user-registration.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserRegistrationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_amazon_cognito_identity_js__ = __webpack_require__("../../../../amazon-cognito-identity-js/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_aws_sdk_global__ = __webpack_require__("../../../../aws-sdk/browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_aws_sdk_global___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_aws_sdk_global__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cognito_cognito_service__ = __webpack_require__("../../../../../src/app/service/cognito/cognito.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * 会員登録サービス
 */




var UserRegistrationService = /** @class */ (function () {
    function UserRegistrationService(cognitoUtil) {
        this.cognitoUtil = cognitoUtil;
    }
    /**
     * 登録する
     * @param {string} user 登録したいユーザー情報
     * @param {CognitoCallback} callback 実行後処理
     */
    UserRegistrationService.prototype.register = function (user, callback) {
        console.log("UserRegistrationService: user is " + user);
        var attributeList = [];
        var dataEmail = {
            Name: 'email',
            Value: user.email
        };
        var dataGivenName = {
            Name: 'given_name',
            Value: user.givenName
        };
        var dataFamilyName = {
            Name: 'family_name',
            Value: user.familyName
        };
        var dataPhoneNumber = {
            Name: 'phone_number',
            Value: user.phoneNumber
        };
        attributeList.push(new __WEBPACK_IMPORTED_MODULE_1_amazon_cognito_identity_js__["c" /* CognitoUserAttribute */](dataEmail));
        attributeList.push(new __WEBPACK_IMPORTED_MODULE_1_amazon_cognito_identity_js__["c" /* CognitoUserAttribute */](dataGivenName));
        attributeList.push(new __WEBPACK_IMPORTED_MODULE_1_amazon_cognito_identity_js__["c" /* CognitoUserAttribute */](dataFamilyName));
        attributeList.push(new __WEBPACK_IMPORTED_MODULE_1_amazon_cognito_identity_js__["c" /* CognitoUserAttribute */](dataPhoneNumber));
        this.cognitoUtil.getUserPool().signUp(user.username, user.password, attributeList, null, function (err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            }
            else {
                console.log("UserRegistrationService: registered user is " + result);
                callback.cognitoCallback(null, result);
            }
        });
    };
    /**
     * 登録確認コードを検証する
     * @param {string} username ユーザーネーム
     * @param {string} confirmationCode 確認コード
     * @param {CognitoCallback} callback 実行後処理
     */
    UserRegistrationService.prototype.confirmRegistration = function (username, confirmationCode, callback) {
        var userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };
        var cognitoUser = new __WEBPACK_IMPORTED_MODULE_1_amazon_cognito_identity_js__["b" /* CognitoUser */](userData);
        cognitoUser.confirmRegistration(confirmationCode, true, function (err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            }
            else {
                callback.cognitoCallback(null, result);
            }
        });
    };
    /**
     * 確認コードを再送信する
     * @param {string} username ユーザーネーム
     * @param {CognitoCallback} callback 実行後処理
     */
    UserRegistrationService.prototype.resendCode = function (username, callback) {
        var userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };
        var cognitoUser = new __WEBPACK_IMPORTED_MODULE_1_amazon_cognito_identity_js__["b" /* CognitoUser */](userData);
        cognitoUser.resendConfirmationCode(function (err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            }
            else {
                callback.cognitoCallback(null, result);
            }
        });
    };
    /**
     * パスワードを変更する
     * @param {NewPasswordUser} newPasswordUser 新パスワードユーザー
     * @param {CognitoCallback} callback 実行後処理
     */
    UserRegistrationService.prototype.newPassword = function (newPasswordUser, callback) {
        console.log(newPasswordUser);
        // Get these details and call
        // cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this);
        var authenticationData = {
            Username: newPasswordUser.username,
            Password: newPasswordUser.existingPassword
        };
        var authenticationDetails = new __WEBPACK_IMPORTED_MODULE_1_amazon_cognito_identity_js__["a" /* AuthenticationDetails */](authenticationData);
        var userData = {
            Username: newPasswordUser.username,
            Pool: this.cognitoUtil.getUserPool()
        };
        console.log('UserLoginService: Params set...Authenticating the user');
        var cognitoUser = new __WEBPACK_IMPORTED_MODULE_1_amazon_cognito_identity_js__["b" /* CognitoUser */](userData);
        console.log("UserLoginService: config is " + __WEBPACK_IMPORTED_MODULE_2_aws_sdk_global__["config"]);
        cognitoUser.authenticateUser(authenticationDetails, {
            newPasswordRequired: function (userAttributes, requiredAttributes) {
                // User was signed up by an admin and must provide new
                // password and required attributes, if any, to complete
                // authentication.
                // the api doesn't accept this field back
                delete userAttributes.email_verified;
                cognitoUser.completeNewPasswordChallenge(newPasswordUser.password, requiredAttributes, {
                    onSuccess: function (result) {
                        console.log(result);
                        callback.cognitoCallback(null, userAttributes);
                    },
                    onFailure: function (err) {
                        callback.cognitoCallback(err, null);
                    }
                });
            },
            onSuccess: function (result) {
                callback.cognitoCallback(null, result);
            },
            onFailure: function (err) {
                callback.cognitoCallback(err, null);
            }
        });
    };
    UserRegistrationService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3__cognito_cognito_service__["a" /* CognitoUtil */])),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__cognito_cognito_service__["a" /* CognitoUtil */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__cognito_cognito_service__["a" /* CognitoUtil */]) === "function" && _a || Object])
    ], UserRegistrationService);
    return UserRegistrationService;
    var _a;
}());

//# sourceMappingURL=user-registration.service.js.map

/***/ }),

/***/ "../../../../../src/app/service/user/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * UserService
 */

var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], UserService);
    return UserService;
}());

//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
/**
 * 環境変数test
 */
var environment = {
    production: false,
    region: 'ap-northeast-1',
    identityPoolId: 'ap-northeast-1:6a67f523-93c3-4766-b96f-6552f21abd8d',
    userPoolId: 'ap-northeast-1_bQcyLA7Jq',
    clientId: '1618r3pm156vu09l6m94vo1t72',
    rekognitionBucket: 'rekognition-pics',
    albumName: 'usercontent',
    bucketRegion: 'us-east-1',
    ddbTableName: 'LoginTrail',
    cognito_idp_endpoint: '',
    cognito_identity_endpoint: '',
    sts_endpoint: '',
    sasakiAuthDomain: 'sskts-development.auth.ap-northeast-1.amazoncognito.com',
    sasakiAuthRedirectUri: 'https://sskts-ticket-development.azurewebsites.net/signIn',
    sasakiAuthLogoutUri: 'https://sskts-ticket-development.azurewebsites.net/signOut',
    tokenIssuer: 'https://cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_bQcyLA7Jq',
    sasakiAPIEndpoint: 'https://sskts-api-development-preview.azurewebsites.net',
    resourceServerDomain: 'https://sskts-api-test.azurewebsites.net',
    // tslint:disable-next-line:no-http-string
    portalSite: 'http://www.cinemasunshine.co.jp',
    // tslint:disable-next-line:no-http-string
    ticketingSite: 'https://sskts-frontend-development-preview.azurewebsites.net'
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/**
 * main
 */




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../moment/locale/af.js",
	"./af.js": "../../../../moment/locale/af.js",
	"./ar": "../../../../moment/locale/ar.js",
	"./ar-dz": "../../../../moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../moment/locale/ar-dz.js",
	"./ar-kw": "../../../../moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../moment/locale/ar-kw.js",
	"./ar-ly": "../../../../moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../moment/locale/ar-ly.js",
	"./ar-ma": "../../../../moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../moment/locale/ar-ma.js",
	"./ar-sa": "../../../../moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../moment/locale/ar-sa.js",
	"./ar-tn": "../../../../moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../moment/locale/ar-tn.js",
	"./ar.js": "../../../../moment/locale/ar.js",
	"./az": "../../../../moment/locale/az.js",
	"./az.js": "../../../../moment/locale/az.js",
	"./be": "../../../../moment/locale/be.js",
	"./be.js": "../../../../moment/locale/be.js",
	"./bg": "../../../../moment/locale/bg.js",
	"./bg.js": "../../../../moment/locale/bg.js",
	"./bn": "../../../../moment/locale/bn.js",
	"./bn.js": "../../../../moment/locale/bn.js",
	"./bo": "../../../../moment/locale/bo.js",
	"./bo.js": "../../../../moment/locale/bo.js",
	"./br": "../../../../moment/locale/br.js",
	"./br.js": "../../../../moment/locale/br.js",
	"./bs": "../../../../moment/locale/bs.js",
	"./bs.js": "../../../../moment/locale/bs.js",
	"./ca": "../../../../moment/locale/ca.js",
	"./ca.js": "../../../../moment/locale/ca.js",
	"./cs": "../../../../moment/locale/cs.js",
	"./cs.js": "../../../../moment/locale/cs.js",
	"./cv": "../../../../moment/locale/cv.js",
	"./cv.js": "../../../../moment/locale/cv.js",
	"./cy": "../../../../moment/locale/cy.js",
	"./cy.js": "../../../../moment/locale/cy.js",
	"./da": "../../../../moment/locale/da.js",
	"./da.js": "../../../../moment/locale/da.js",
	"./de": "../../../../moment/locale/de.js",
	"./de-at": "../../../../moment/locale/de-at.js",
	"./de-at.js": "../../../../moment/locale/de-at.js",
	"./de-ch": "../../../../moment/locale/de-ch.js",
	"./de-ch.js": "../../../../moment/locale/de-ch.js",
	"./de.js": "../../../../moment/locale/de.js",
	"./dv": "../../../../moment/locale/dv.js",
	"./dv.js": "../../../../moment/locale/dv.js",
	"./el": "../../../../moment/locale/el.js",
	"./el.js": "../../../../moment/locale/el.js",
	"./en-au": "../../../../moment/locale/en-au.js",
	"./en-au.js": "../../../../moment/locale/en-au.js",
	"./en-ca": "../../../../moment/locale/en-ca.js",
	"./en-ca.js": "../../../../moment/locale/en-ca.js",
	"./en-gb": "../../../../moment/locale/en-gb.js",
	"./en-gb.js": "../../../../moment/locale/en-gb.js",
	"./en-ie": "../../../../moment/locale/en-ie.js",
	"./en-ie.js": "../../../../moment/locale/en-ie.js",
	"./en-nz": "../../../../moment/locale/en-nz.js",
	"./en-nz.js": "../../../../moment/locale/en-nz.js",
	"./eo": "../../../../moment/locale/eo.js",
	"./eo.js": "../../../../moment/locale/eo.js",
	"./es": "../../../../moment/locale/es.js",
	"./es-do": "../../../../moment/locale/es-do.js",
	"./es-do.js": "../../../../moment/locale/es-do.js",
	"./es.js": "../../../../moment/locale/es.js",
	"./et": "../../../../moment/locale/et.js",
	"./et.js": "../../../../moment/locale/et.js",
	"./eu": "../../../../moment/locale/eu.js",
	"./eu.js": "../../../../moment/locale/eu.js",
	"./fa": "../../../../moment/locale/fa.js",
	"./fa.js": "../../../../moment/locale/fa.js",
	"./fi": "../../../../moment/locale/fi.js",
	"./fi.js": "../../../../moment/locale/fi.js",
	"./fo": "../../../../moment/locale/fo.js",
	"./fo.js": "../../../../moment/locale/fo.js",
	"./fr": "../../../../moment/locale/fr.js",
	"./fr-ca": "../../../../moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../moment/locale/fr-ca.js",
	"./fr-ch": "../../../../moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../moment/locale/fr-ch.js",
	"./fr.js": "../../../../moment/locale/fr.js",
	"./fy": "../../../../moment/locale/fy.js",
	"./fy.js": "../../../../moment/locale/fy.js",
	"./gd": "../../../../moment/locale/gd.js",
	"./gd.js": "../../../../moment/locale/gd.js",
	"./gl": "../../../../moment/locale/gl.js",
	"./gl.js": "../../../../moment/locale/gl.js",
	"./gom-latn": "../../../../moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../moment/locale/gom-latn.js",
	"./he": "../../../../moment/locale/he.js",
	"./he.js": "../../../../moment/locale/he.js",
	"./hi": "../../../../moment/locale/hi.js",
	"./hi.js": "../../../../moment/locale/hi.js",
	"./hr": "../../../../moment/locale/hr.js",
	"./hr.js": "../../../../moment/locale/hr.js",
	"./hu": "../../../../moment/locale/hu.js",
	"./hu.js": "../../../../moment/locale/hu.js",
	"./hy-am": "../../../../moment/locale/hy-am.js",
	"./hy-am.js": "../../../../moment/locale/hy-am.js",
	"./id": "../../../../moment/locale/id.js",
	"./id.js": "../../../../moment/locale/id.js",
	"./is": "../../../../moment/locale/is.js",
	"./is.js": "../../../../moment/locale/is.js",
	"./it": "../../../../moment/locale/it.js",
	"./it.js": "../../../../moment/locale/it.js",
	"./ja": "../../../../moment/locale/ja.js",
	"./ja.js": "../../../../moment/locale/ja.js",
	"./jv": "../../../../moment/locale/jv.js",
	"./jv.js": "../../../../moment/locale/jv.js",
	"./ka": "../../../../moment/locale/ka.js",
	"./ka.js": "../../../../moment/locale/ka.js",
	"./kk": "../../../../moment/locale/kk.js",
	"./kk.js": "../../../../moment/locale/kk.js",
	"./km": "../../../../moment/locale/km.js",
	"./km.js": "../../../../moment/locale/km.js",
	"./kn": "../../../../moment/locale/kn.js",
	"./kn.js": "../../../../moment/locale/kn.js",
	"./ko": "../../../../moment/locale/ko.js",
	"./ko.js": "../../../../moment/locale/ko.js",
	"./ky": "../../../../moment/locale/ky.js",
	"./ky.js": "../../../../moment/locale/ky.js",
	"./lb": "../../../../moment/locale/lb.js",
	"./lb.js": "../../../../moment/locale/lb.js",
	"./lo": "../../../../moment/locale/lo.js",
	"./lo.js": "../../../../moment/locale/lo.js",
	"./lt": "../../../../moment/locale/lt.js",
	"./lt.js": "../../../../moment/locale/lt.js",
	"./lv": "../../../../moment/locale/lv.js",
	"./lv.js": "../../../../moment/locale/lv.js",
	"./me": "../../../../moment/locale/me.js",
	"./me.js": "../../../../moment/locale/me.js",
	"./mi": "../../../../moment/locale/mi.js",
	"./mi.js": "../../../../moment/locale/mi.js",
	"./mk": "../../../../moment/locale/mk.js",
	"./mk.js": "../../../../moment/locale/mk.js",
	"./ml": "../../../../moment/locale/ml.js",
	"./ml.js": "../../../../moment/locale/ml.js",
	"./mr": "../../../../moment/locale/mr.js",
	"./mr.js": "../../../../moment/locale/mr.js",
	"./ms": "../../../../moment/locale/ms.js",
	"./ms-my": "../../../../moment/locale/ms-my.js",
	"./ms-my.js": "../../../../moment/locale/ms-my.js",
	"./ms.js": "../../../../moment/locale/ms.js",
	"./my": "../../../../moment/locale/my.js",
	"./my.js": "../../../../moment/locale/my.js",
	"./nb": "../../../../moment/locale/nb.js",
	"./nb.js": "../../../../moment/locale/nb.js",
	"./ne": "../../../../moment/locale/ne.js",
	"./ne.js": "../../../../moment/locale/ne.js",
	"./nl": "../../../../moment/locale/nl.js",
	"./nl-be": "../../../../moment/locale/nl-be.js",
	"./nl-be.js": "../../../../moment/locale/nl-be.js",
	"./nl.js": "../../../../moment/locale/nl.js",
	"./nn": "../../../../moment/locale/nn.js",
	"./nn.js": "../../../../moment/locale/nn.js",
	"./pa-in": "../../../../moment/locale/pa-in.js",
	"./pa-in.js": "../../../../moment/locale/pa-in.js",
	"./pl": "../../../../moment/locale/pl.js",
	"./pl.js": "../../../../moment/locale/pl.js",
	"./pt": "../../../../moment/locale/pt.js",
	"./pt-br": "../../../../moment/locale/pt-br.js",
	"./pt-br.js": "../../../../moment/locale/pt-br.js",
	"./pt.js": "../../../../moment/locale/pt.js",
	"./ro": "../../../../moment/locale/ro.js",
	"./ro.js": "../../../../moment/locale/ro.js",
	"./ru": "../../../../moment/locale/ru.js",
	"./ru.js": "../../../../moment/locale/ru.js",
	"./sd": "../../../../moment/locale/sd.js",
	"./sd.js": "../../../../moment/locale/sd.js",
	"./se": "../../../../moment/locale/se.js",
	"./se.js": "../../../../moment/locale/se.js",
	"./si": "../../../../moment/locale/si.js",
	"./si.js": "../../../../moment/locale/si.js",
	"./sk": "../../../../moment/locale/sk.js",
	"./sk.js": "../../../../moment/locale/sk.js",
	"./sl": "../../../../moment/locale/sl.js",
	"./sl.js": "../../../../moment/locale/sl.js",
	"./sq": "../../../../moment/locale/sq.js",
	"./sq.js": "../../../../moment/locale/sq.js",
	"./sr": "../../../../moment/locale/sr.js",
	"./sr-cyrl": "../../../../moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../moment/locale/sr.js",
	"./ss": "../../../../moment/locale/ss.js",
	"./ss.js": "../../../../moment/locale/ss.js",
	"./sv": "../../../../moment/locale/sv.js",
	"./sv.js": "../../../../moment/locale/sv.js",
	"./sw": "../../../../moment/locale/sw.js",
	"./sw.js": "../../../../moment/locale/sw.js",
	"./ta": "../../../../moment/locale/ta.js",
	"./ta.js": "../../../../moment/locale/ta.js",
	"./te": "../../../../moment/locale/te.js",
	"./te.js": "../../../../moment/locale/te.js",
	"./tet": "../../../../moment/locale/tet.js",
	"./tet.js": "../../../../moment/locale/tet.js",
	"./th": "../../../../moment/locale/th.js",
	"./th.js": "../../../../moment/locale/th.js",
	"./tl-ph": "../../../../moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../moment/locale/tl-ph.js",
	"./tlh": "../../../../moment/locale/tlh.js",
	"./tlh.js": "../../../../moment/locale/tlh.js",
	"./tr": "../../../../moment/locale/tr.js",
	"./tr.js": "../../../../moment/locale/tr.js",
	"./tzl": "../../../../moment/locale/tzl.js",
	"./tzl.js": "../../../../moment/locale/tzl.js",
	"./tzm": "../../../../moment/locale/tzm.js",
	"./tzm-latn": "../../../../moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../moment/locale/tzm.js",
	"./uk": "../../../../moment/locale/uk.js",
	"./uk.js": "../../../../moment/locale/uk.js",
	"./ur": "../../../../moment/locale/ur.js",
	"./ur.js": "../../../../moment/locale/ur.js",
	"./uz": "../../../../moment/locale/uz.js",
	"./uz-latn": "../../../../moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../moment/locale/uz-latn.js",
	"./uz.js": "../../../../moment/locale/uz.js",
	"./vi": "../../../../moment/locale/vi.js",
	"./vi.js": "../../../../moment/locale/vi.js",
	"./x-pseudo": "../../../../moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../moment/locale/x-pseudo.js",
	"./yo": "../../../../moment/locale/yo.js",
	"./yo.js": "../../../../moment/locale/yo.js",
	"./zh-cn": "../../../../moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../moment/locale/zh-cn.js",
	"./zh-hk": "../../../../moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../moment/locale/zh-hk.js",
	"./zh-tw": "../../../../moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[1]);
//# sourceMappingURL=main.bundle.js.map