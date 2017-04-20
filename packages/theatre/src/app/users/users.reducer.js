"use strict";
var users_actions_1 = require('./users.actions');
var INITIAL_STATE = {
    items: [],
    loading: false,
    error: false
};
function users(state, action) {
    if (state === void 0) { state = INITIAL_STATE; }
    switch (action.type) {
        case users_actions_1.userActionsNames.LOAD_SUCCEEDED:
            console.log(action.data);
            return {
                items: [{ name: 'sasha', id: "1" }],
                loading: false,
                error: false
            };
        default:
            return state;
    }
}
exports.__esModule = true;
exports["default"] = users;
