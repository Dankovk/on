"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var axios_1 = require('axios');
var IframeService = (function () {
    function IframeService(http, actions) {
        this.http = http;
        this.actions = actions;
    }
    IframeService.prototype.getAll = function () {
        var _this = this;
        axios_1["default"].get('http://www.mocky.io/v2/58f614b4260000571c4ada6f')
            .then(function (data) {
            _this.actions.loadSucceeded(data.data);
        })
            .catch(function (error) {
            _this.actions.loadFailed(error);
        });
    };
    IframeService = __decorate([
        core_1.Injectable()
    ], IframeService);
    return IframeService;
}());
exports.IframeService = IframeService;
