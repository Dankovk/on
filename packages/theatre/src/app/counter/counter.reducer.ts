import { counterActionsNames } from './counter.actions';

interface ICounter {
    countNum: number
}

const INITIAL_STATE = {
    countNum: 0
};

export function counterReducer(state: ICounter = INITIAL_STATE, action: any) {
    switch (action.type) {
        case counterActionsNames.INCREMENT_COUNTER :
            return {
                ...state,
                countNum: state.countNum + 1
            };
        case counterActionsNames.DECREMENT_COUNTER :
            return {
                ...state,
                countNum: state.countNum - 1
            };
        default:
            return state;
    }
}