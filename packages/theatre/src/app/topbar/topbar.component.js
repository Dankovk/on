"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var store_1 = require("@angular-redux/store");
var TopbarComponent = (function () {
    function TopbarComponent(actions) {
        this.actions = actions;
        this.readonly = atoms;
    }
    TopbarComponent.prototype.Observable = ;
    __decorate([
        store_1.select(['json', 'data', 'atoms'])
    ], TopbarComponent.prototype, "readonly");
    TopbarComponent = __decorate([
        core_1.Component({
            selector: 'topbar',
            templateUrl: './topbar.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], TopbarComponent);
    return TopbarComponent;
}());
exports.TopbarComponent = TopbarComponent;
 > ;
;
