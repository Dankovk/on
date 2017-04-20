import {jsonActionsNames} from "./json-populator.actions";

const INITIAL_STATE = {
    data: false,
    loading: false,
    error: false,
    selectedComponent: null,
    demoName: ''
};

export default function jsonReducer(state: any = INITIAL_STATE, action: any) {
    switch (action.type) {
        case jsonActionsNames.LOAD_STARTED:
            return {
                ...state,
                loading: true
            };
        case jsonActionsNames.LOAD_SUCCEEDED :
            return {
                ...state,
                data: action.data,
                loading: false,
            };
        case jsonActionsNames.COMPONENT_SELECTED:
            return {
                ...state,
                selectedComponent: state.data[action.pattern].filter(elem => elem.name === action.component)[0]
            };
        case jsonActionsNames.DEMO_SELECTED:
            console.log(action.name);
            return {
                ...state,
                demoName: action.name
            };
        default:
            return state;
    }
}