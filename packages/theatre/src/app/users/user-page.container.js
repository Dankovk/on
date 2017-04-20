"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var store_1 = require("@angular-redux/store");
var Observable_1 = require("rxjs/Observable");
var users_service_1 = require('./users.service');
var UserPageComponent = (function () {
    function UserPageComponent() {
        // Get elephant-related data out of the Redux store as observables.
        this.readonly = users;
    }
    UserPageComponent.prototype.Observable = ;
    __decorate([
        store_1.select(['users', 'items'])
    ], UserPageComponent.prototype, "readonly");
    UserPageComponent = __decorate([
        core_1.Component({
            template: "\n        <ul>\n          <li *ngFor=\"let user of users | async;\">\n            {{ user.name }}\n          </li>\n        </ul>\n",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], UserPageComponent);
    return UserPageComponent;
}());
exports.UserPageComponent = UserPageComponent;
 > ;
readonly;
loading: Observable_1.Observable();
readonly;
error: Observable_1.Observable();
constructor(service, users_service_1.UsersService);
{
    service.getAll();
}
