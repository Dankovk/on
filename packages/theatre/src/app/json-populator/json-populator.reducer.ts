import {jsonActionsNames} from "./json-populator.actions";

const INITIAL_STATE = {
    data: {
        'static': {
            atoms:[],
            molecules:[]
        },
        'angular': {
            atoms:[],
            molecules:[]
        }
    },
    loading: false,
    loaded: false,
    error: false,
    selectedComponent: {
        pattern: '',
        name: ''
    },
    src: null,
    demoName: null,
    componentType:'static'
};

export default function jsonReducer(state: any = INITIAL_STATE, action: any) {
    switch (action.type) {
        case jsonActionsNames.LOAD_STARTED:
            return {
                ...state,
                loading: true
            };
        case jsonActionsNames.LOAD_SUCCEEDED :
            let newState = {
                'static': {},
                'angular': {}
            };
            Object.keys(action.data).forEach(function(key) {
                newState.static[key] = action.data[key].filter((elem) => {
                    return elem.type === 'static';
                });
                newState.angular[key] = action.data[key].filter((elem) => {
                   return elem.type === 'angular';
                })
            });
            return {
                ...state,
                data: newState,
                loading: false,
                loaded: true
            };
        case jsonActionsNames.COMPONENT_SELECTED:
            const component = state.data[state.componentType][action.pattern].filter(elem => elem.name === action.component)[0];
            return {
                ...state,
                selectedComponent: {
                    ...component,
                    pattern: action.pattern
                }

            };
        case jsonActionsNames.DEMO_SELECTED:
            return {
                ...state,
                src: action.src
            };
        case jsonActionsNames.TYPE_SELECTED:
            return {
                ...state,
                componentType: action.componentType
            };
        default:
            return state;
    }
}
