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
var user_list_component_1 = require('./user/user-list.component');
var user_page_container_1 = require('./user-page.container');
var users_actions_1 = require('./users.actions');
var users_service_1 = require('./users.service');
var UserModule = (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        core_1.NgModule({
            declarations: [user_list_component_1.UserListComponent, user_page_container_1.UserPageComponent],
            exports: [user_list_component_1.UserListComponent, user_page_container_1.UserPageComponent],
            imports: [core_module_1.CoreModule, store_module_1.StoreModule, common_1.CommonModule],
            providers: [users_actions_1.UserActions, users_service_1.UsersService]
        })
    ], UserModule);
    return UserModule;
}());
exports.UserModule = UserModule;
