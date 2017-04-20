"use strict";
var iframe_actions_1 = require('./iframe.actions');
var INITIAL_STATE = {
    src: '',
    loading: false,
    error: false
};
function iframeReducer(state, action) {
    if (state === void 0) { state = INITIAL_STATE; }
    switch (action.type) {
        case iframe_actions_1.iframeActionsNames.LOAD_SUCCEEDED:
            return {
                src: 'http://localhost:3000/components/atoms/header_1.html',
                loading: false,
                error: false
            };
        default:
            return state;
    }
}
exports.iframeReducer = iframeReducer;
