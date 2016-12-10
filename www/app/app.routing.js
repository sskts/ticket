"use strict";
const router_1 = require('@angular/router');
const IndexComponent_1 = require('./components/index/IndexComponent');
const appRoutes = [
    {
        path: '',
        component: IndexComponent_1.IndexComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
