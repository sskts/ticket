"use strict";
const router_1 = require('@angular/router');
const redirect_component_1 = require('./components/redirect/redirect.component');
const index_component_1 = require('./components/index/index.component');
const auth_component_1 = require('./components/auth/auth.component');
const auth_login_component_1 = require('./components/auth-login/auth-login.component');
const regist_input_component_1 = require('./components/regist-input/regist-input.component');
const regist_confirm_component_1 = require('./components/regist-confirm/regist-confirm.component');
const regist_password_component_1 = require('./components/regist-password/regist-password.component');
const regist_complete_component_1 = require('./components/regist-complete/regist-complete.component');
const performance_component_1 = require('./components/performance/performance.component');
const my_page_component_1 = require('./components/my-page/my-page.component');
const appRoutes = [
    {
        path: '',
        component: redirect_component_1.RedirectComponent,
    },
    {
        path: 'index',
        component: index_component_1.IndexComponent,
    },
    {
        path: 'auth',
        component: auth_component_1.AuthComponent
    },
    {
        path: 'auth/login',
        component: auth_login_component_1.AuthLoginComponent
    },
    {
        path: 'regist/input',
        component: regist_input_component_1.RegistInputComponent
    },
    {
        path: 'regist/confirm',
        component: regist_confirm_component_1.RegistConfirmComponent
    },
    {
        path: 'regist/password',
        component: regist_password_component_1.RegistPasswordComponent
    },
    {
        path: 'regist/complete',
        component: regist_complete_component_1.RegistCompleteComponent
    },
    {
        path: 'performance',
        component: performance_component_1.PerformanceComponent
    },
    {
        path: 'myPage',
        component: my_page_component_1.MyPageComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
