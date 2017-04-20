"use strict";
var counter_actions_1 = require('./counter.actions');
var INITIAL_STATE = {
    countNum: 0
};
function counterReducer(state, action) {
    if (state === void 0) { state = INITIAL_STATE; }
    switch (action.type) {
        case counter_actions_1.counterActionsNames.INCREMENT_COUNTER:
            return {
                state: state,
                countNum: state.countNum + 1
            };
        case counter_actions_1.counterActionsNames.DECREMENT_COUNTER:
            return {
                state: state,
                countNum: state.countNum - 1
            };
        default:
            return state;
    }
}
exports.counterReducer = counterReducer;
