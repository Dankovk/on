"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var store_1 = require('@angular-redux/store');
var router_2 = require('@angular-redux/router');
// This app's ngModules
var store_module_1 = require('./store/store.module');
var users_module_1 = require('./users/users.module');
var counter_module_1 = require('./counter/counter.module');
// Top-level app component constructs.
var app_routes_1 = require('./app.routes');
var app_service_1 = require('./app.service');
var json_populator_actions_1 = require('./json-populator/json-populator.actions');
var app_component_1 = require('./app.component');
var topbar_component_1 = require('./topbar/topbar.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent, topbar_component_1.TopbarComponent],
            imports: [
                router_1.RouterModule.forRoot(app_routes_1.appRoutes),
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                store_1.NgReduxModule,
                router_2.NgReduxRouterModule,
                users_module_1.UserModule,
                counter_module_1.CounterModule,
                store_module_1.StoreModule,
            ],
            providers: [app_service_1.AppService, json_populator_actions_1.JsonActions],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
