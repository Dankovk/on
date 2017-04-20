"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
exports.iframeActionsNames = {
    LOAD_STARTED: 'iframe/LOAD_STARTED',
    LOAD_SUCCEEDED: 'iframe/LOAD_SUCCEEDED',
    LOAD_FAILED: 'iframe/LOAD_FAILED'
};
var IframeActions = (function () {
    function IframeActions(ngRedux) {
        this.ngRedux = ngRedux;
    }
    IframeActions.prototype.loadUsers = function () {
        this.ngRedux.dispatch({
            type: IframeActions.LOAD_STARTED
        });
    };
    IframeActions.prototype.loadSucceeded = function (payload) {
        this.ngRedux.dispatch({
            type: IframeActions.LOAD_SUCCEEDED,
            data: payload
        });
    };
    IframeActions.prototype.loadFailed = function (error) {
        this.ngRedux.dispatch({
            type: IframeActions.LOAD_FAILED,
            data: error
        });
    };
    IframeActions.readonly = LOAD_STARTED = exports.iframeActionsNames.LOAD_STARTED;
    IframeActions.readonly = LOAD_SUCCEEDED = exports.iframeActionsNames.LOAD_SUCCEEDED;
    IframeActions.readonly = LOAD_FAILED = exports.iframeActionsNames.LOAD_FAILED;
    IframeActions = __decorate([
        core_1.Injectable()
    ], IframeActions);
    return IframeActions;
}());
exports.IframeActions = IframeActions;
