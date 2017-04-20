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
var iframe_component_1 = require('./iframe-component/iframe.component');
var iframe_page_container_1 = require('./iframe-page.container');
var iframe_actions_1 = require('./iframe.actions');
var iframe_service_1 = require('./iframe.service');
var IframeModule = (function () {
    function IframeModule() {
    }
    IframeModule = __decorate([
        core_1.NgModule({
            declarations: [iframe_component_1.IframeComponent, iframe_page_container_1.IframePageComponent],
            exports: [iframe_component_1.IframeComponent, iframe_page_container_1.IframePageComponent],
            imports: [core_module_1.CoreModule, store_module_1.StoreModule, common_1.CommonModule],
            providers: [iframe_actions_1.IframeActions, iframe_service_1.IframeService]
        })
    ], IframeModule);
    return IframeModule;
}());
exports.IframeModule = IframeModule;
