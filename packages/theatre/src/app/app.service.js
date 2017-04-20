"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var axios_1 = require("axios");
var AppService = (function () {
    function AppService(actions) {
        this.actions = actions;
    }
    AppService.prototype.getJson = function () {
        var _this = this;
        this.actions.loadJson();
        axios_1["default"].get('http://localhost:3000/theatre.json')
            .then(function (data) {
            _this.actions.loadSucceeded(data.data);
        })
            .catch(function (e) {
            _this.actions.loadFailed(e);
        });
    };
    AppService = __decorate([
        core_1.Injectable()
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
