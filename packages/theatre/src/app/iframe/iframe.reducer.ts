import { iframeActionsNames } from './iframe.actions';

interface IIframe {
    src: string,
    id: number
}

const INITIAL_STATE = {
    src: '',
    loading: false,
    error: false
};

export function iframeReducer(state: IIframe = INITIAL_STATE, action: any) {
    switch (action.type) {
        case iframeActionsNames.LOAD_SUCCEEDED :
            return {
                src: 'http://localhost:3000/components/atoms/header_1.html',
                loading: false,
                error: false
            };
        default:
            return state;
    }
}
