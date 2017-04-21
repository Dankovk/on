"use strict";
var redux_1 = require('redux');
var form_1 = require('@angular-redux/form');
var router_1 = require('@angular-redux/router');
var iframe_reducer_1 = require('../iframe/iframe.reducer');
var counter_reducer_1 = require('../counter/counter.reducer');
var json_populator_reducer_1 = require('../json-populator/json-populator.reducer');
// Define the global store shape by combining our application's
// reducers together into a given structure.
exports.rootReducer = form_1.composeReducers(form_1.defaultFormReducer(), redux_1.combineReducers({
    iframe: iframe_reducer_1.iframeReducer,
    counter: counter_reducer_1.counterReducer,
    router: router_1.routerReducer,
    json: json_populator_reducer_1["default"]
}));