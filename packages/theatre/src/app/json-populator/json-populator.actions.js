"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
exports.jsonActionsNames = {
    LOAD_STARTED: 'json/LOAD_STARTED',
    LOAD_SUCCEEDED: 'json/LOAD_SUCCEEDED',
    LOAD_FAILED: 'json/LOAD_FAILED',
    COMPONENT_SELECTED: 'json/COMPONENT_SELECTED',
    DEMO_SELECTED: 'json/DEMO_SELECTED'
};
var JsonActions = (function () {
    function JsonActions(ngRedux) {
        this.ngRedux = ngRedux;
    }
    JsonActions.prototype.loadJson = function () {
        this.ngRedux.dispatch({
            type: JsonActions.LOAD_STARTED
        });
    };
    JsonActions.prototype.loadSucceeded = function (payload) {
        this.ngRedux.dispatch({
            type: JsonActions.LOAD_SUCCEEDED,
            data: payload
        });
    };
    JsonActions.prototype.loadFailed = function (error) {
        this.ngRedux.dispatch({
            type: JsonActions.LOAD_FAILED,
            data: error
        });
    };
    JsonActions.prototype.selectComponent = function (pattern, component) {
        this.ngRedux.dispatch({
            type: JsonActions.COMPONENT_SELECTED,
            component: component,
            pattern: pattern
        });
    };
    JsonActions.prototype.demoSelected = function (pattern, name, namespace, element) {
        this.ngRedux.dispatch({
            type: exports.jsonActionsNames.DEMO_SELECTED,
            src: "http://localhost:3000/components/" + pattern + "-" + name + "-" + namespace + "-" + element + ".html"
        });
    };
    JsonActions.readonly = LOAD_STARTED = exports.jsonActionsNames.LOAD_STARTED;
    JsonActions.readonly = LOAD_SUCCEEDED = exports.jsonActionsNames.LOAD_SUCCEEDED;
    JsonActions.readonly = LOAD_FAILED = exports.jsonActionsNames.LOAD_FAILED;
    JsonActions.readonly = COMPONENT_SELECTED = exports.jsonActionsNames.COMPONENT_SELECTED;
    JsonActions.readonly = DEMO_SELECTED = exports.jsonActionsNames.DEMO_SELECTED;
    JsonActions = __decorate([
        core_1.Injectable()
    ], JsonActions);
    return JsonActions;
}());
exports.JsonActions = JsonActions;
