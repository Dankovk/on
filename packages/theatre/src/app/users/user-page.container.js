"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _this = this;
var core_1 = require("@angular/core");
var store_1 = require("@angular-redux/store");
var Observable_1 = require("rxjs/Observable");
var users_service_1 = require('./users.service');
var router_1 = require('@angular/router');
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
            template: "\n        <ul>\n          <li *ngFor=\"let user of users | async;\">\n            test {{ user.name }} {{ atom }}\n          </li>\n        </ul>\n        <iframe src=\"http://localhost:3000/components/atoms/header_1.html\" frameborder=\"0\"></iframe>\n",
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
atom: string;
sub: any;
constructor(service, users_service_1.UsersService, private, route, router_1.ActivatedRoute);
{
    service.getAll();
}
ngOnInit();
{
    this.sub = this.route.params.subscribe(function (params) {
        _this.atom = params['atom'];
    });
}
