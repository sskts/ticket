"use strict";
const platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
const app_module_1 = require('./app.module');
// import { environment } from '../environments/environment';
// if (environment.production) {
//   enableProdMode();
// }
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
