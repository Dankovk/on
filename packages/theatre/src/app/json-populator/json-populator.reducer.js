"use strict";
var json_populator_actions_1 = require("./json-populator.actions");
var INITIAL_STATE = {
    data: false,
    loading: false,
    error: false,
    selectedComponent: null,
    demoName: null
};
function jsonReducer(state, action) {
    if (state === void 0) { state = INITIAL_STATE; }
    switch (action.type) {
        case json_populator_actions_1.jsonActionsNames.LOAD_STARTED:
            return {
                state: state,
                loading: true
            };
        case json_populator_actions_1.jsonActionsNames.LOAD_SUCCEEDED:
            return {
                state: state,
                data: action.data,
                loading: false
            };
        case json_populator_actions_1.jsonActionsNames.COMPONENT_SELECTED:
            return {
                state: state,
                selectedComponent: state.data[action.pattern].filter(function (elem) { return elem.name === action.component; })[0]
            };
        case json_populator_actions_1.jsonActionsNames.DEMO_SELECTED:
            return {
                state: state,
                src: action.src
            };
        default:
            return state;
    }
}
exports.__esModule = true;
exports["default"] = jsonReducer;
