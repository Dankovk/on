"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
exports.counterActionsNames = {
    INCREMENT_COUNTER: 'counter/INCREMENT_COUNTER',
    DECREMENT_COUNTER: 'counter/DECREMENT_COUNTER'
};
var CounterActions = (function () {
    function CounterActions(ngRedux) {
        this.ngRedux = ngRedux;
    }
    CounterActions.prototype.incrementCounter = function () {
        this.ngRedux.dispatch({
            type: CounterActions.INCREMENT_COUNTER
        });
    };
    CounterActions.prototype.decrementCounter = function () {
        this.ngRedux.dispatch({
            type: CounterActions.DECREMENT_COUNTER
        });
    };
    CounterActions.readonly = INCREMENT_COUNTER = exports.counterActionsNames.INCREMENT_COUNTER;
    CounterActions.readonly = DECREMENT_COUNTER = exports.counterActionsNames.DECREMENT_COUNTER;
    CounterActions = __decorate([
        core_1.Injectable()
    ], CounterActions);
    return CounterActions;
}());
exports.CounterActions = CounterActions;
