import { jsonActionsNames } from './json-populator.actions';

const INITIAL_STATE = {
    data: false,
    loading: false,
    error: false,
    selectedComponent: null
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
            console.log(action.pattern);
            return {
                ...state,
                selectedComponent: state.data[action.pattern].filter( elem => elem.name === action.component)[0]

            };
        default:
            return state;
    }
}