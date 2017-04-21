"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
// Angular-redux ecosystem stuff.
// @angular-redux/form and @angular-redux/router are optional
// extensions that sync form and route location state between
// our store and Angular.
var store_1 = require('@angular-redux/store');
var router_1 = require('@angular-redux/router');
var form_1 = require('@angular-redux/form');
// Redux ecosystem stuff.
// import * as createLogger from 'redux-logger';
var redux_logger_1 = require('redux-logger');
var root_reducer_1 = require('./root.reducer');
var StoreModule = (function () {
    function StoreModule(store, devTools, ngReduxRouter) {
        this.store = store;
        // Tell Redux about our reducers and epics. If the Redux DevTools
        // chrome extension is available in the browser, tell Redux about
        // it too.
        store.configureStore(root_reducer_1.rootReducer, {}, [redux_logger_1.createLogger()], devTools.isEnabled() ? [devTools.enhancer()] : []);
        // Enable syncing of Angular router state with our Redux store.
        ngReduxRouter.initialize();
        // Enable syncing of Angular form state with our Redux store.
        form_1.provideReduxForms(store);
    }
    StoreModule = __decorate([
        core_1.NgModule({
            imports: [store_1.NgReduxModule, router_1.NgReduxRouterModule]
        })
    ], StoreModule);
    return StoreModule;
}());
exports.StoreModule = StoreModule;
