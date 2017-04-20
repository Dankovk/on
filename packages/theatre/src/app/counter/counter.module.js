"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var core_module_1 = require('../core/core.module');
var store_module_1 = require('../store/store.module');
// import { CounterComponent } from './counter/counter.component';
var counter_page_container_1 = require('./counter-page.container');
var counter_actions_1 = require('./counter.actions');
var counter_service_1 = require('./counter.service');
var CounterModule = (function () {
    function CounterModule() {
    }
    CounterModule = __decorate([
        core_1.NgModule({
            declarations: [counter_page_container_1.CounterPageComponent],
            exports: [counter_page_container_1.CounterPageComponent],
            imports: [core_module_1.CoreModule, store_module_1.StoreModule, common_1.CommonModule],
            providers: [counter_actions_1.CounterActions, counter_service_1.CounterService]
        })
    ], CounterModule);
    return CounterModule;
}());
exports.CounterModule = CounterModule;
