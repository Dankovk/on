"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
exports.userActionsNames = {
    LOAD_STARTED: 'users/LOAD_STARTED',
    LOAD_SUCCEEDED: 'users/LOAD_SUCCEEDED',
    LOAD_FAILED: 'users/LOAD_FAILED'
};
var UserActions = (function () {
    function UserActions(ngRedux) {
        this.ngRedux = ngRedux;
    }
    UserActions.prototype.loadUsers = function () {
        this.ngRedux.dispatch({
            type: UserActions.LOAD_STARTED
        });
    };
    UserActions.prototype.loadSucceeded = function (payload) {
        this.ngRedux.dispatch({
            type: UserActions.LOAD_SUCCEEDED,
            data: payload
        });
    };
    UserActions.prototype.loadFailed = function (error) {
        this.ngRedux.dispatch({
            type: UserActions.LOAD_FAILED,
            data: error
        });
    };
    UserActions.readonly = LOAD_STARTED = exports.userActionsNames.LOAD_STARTED;
    UserActions.readonly = LOAD_SUCCEEDED = exports.userActionsNames.LOAD_SUCCEEDED;
    UserActions.readonly = LOAD_FAILED = exports.userActionsNames.LOAD_FAILED;
    UserActions = __decorate([
        core_1.Injectable()
    ], UserActions);
    return UserActions;
}());
exports.UserActions = UserActions;
