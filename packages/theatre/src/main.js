"use strict";
require('./polyfill');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var environment_1 = require('./environment');
// import { AppModule } from './one/index';
var index_1 = require('./app/index');
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(index_1.AppModule).then(environment_1.decorateModuleRef);
