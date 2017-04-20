"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var CounterComponent = (function () {
    function CounterComponent() {
    }
    __decorate([
        core_1.Input
    ], CounterComponent.prototype, "countNum");
    CounterComponent = __decorate([
        core_1.Component({
            selector: 'counter',
            templateUrl: "\n    <div>\n        <div>Count: {{countNum}}</div>\n        <button onClick={incrementCounter()}>+1</button>\n        <button onClick={decrementCounter()}>-1</button>\n    </div>\n    ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], CounterComponent);
    return CounterComponent;
}());
exports.CounterComponent = CounterComponent;
