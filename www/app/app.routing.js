"use strict";
const router_1 = require('@angular/router');
const IndexComponent_1 = require('./components/pages/index/IndexComponent');
const AuthComponent_1 = require('./components/pages/auth/AuthComponent');
const AuthLoginComponent_1 = require('./components/pages/auth/login/AuthLoginComponent');
const RegistInputComponent_1 = require('./components/pages/regist/RegistInputComponent');
const RegistConfirmComponent_1 = require('./components/pages/regist/RegistConfirmComponent');
const RegistPasswordComponent_1 = require('./components/pages/regist/RegistPasswordComponent');
const RegistCompleteComponent_1 = require('./components/pages/regist/RegistCompleteComponent');
const appRoutes = [
    {
        path: '',
        component: IndexComponent_1.IndexComponent,
    },
    {
        path: 'auth',
        component: AuthComponent_1.AuthComponent
    },
    {
        path: 'auth/login',
        component: AuthLoginComponent_1.AuthLoginComponent
    },
    {
        path: 'regist/input',
        component: RegistInputComponent_1.RegistInputComponent
    },
    {
        path: 'regist/confirm',
        component: RegistConfirmComponent_1.RegistConfirmComponent
    },
    {
        path: 'regist/password',
        component: RegistPasswordComponent_1.RegistPasswordComponent
    },
    {
        path: 'regist/complete',
        component: RegistCompleteComponent_1.RegistCompleteComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
