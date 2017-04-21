"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var store_1 = require("@angular-redux/store");
var IframeComponent = (function () {
    function IframeComponent(sanitizer) {
        this.sanitizer = sanitizer;
        this.readonly = demoName;
        this.readonly = atomName;
        this.readonly = src;
    }
    IframeComponent.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    __decorate([
        store_1.select(['json', 'demoName'])
    ], IframeComponent.prototype, "readonly");
    __decorate([
        store_1.select(['json', 'selectedComponent', 'name'])
    ], IframeComponent.prototype, "readonly");
    __decorate([
        store_1.select(['json', 'src'])
    ], IframeComponent.prototype, "readonly");
    IframeComponent = __decorate([
        core_1.Component({
            selector: 'iframe-component',
            templateUrl: './iframe.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], IframeComponent);
    return IframeComponent;
}());
exports.IframeComponent = IframeComponent;
