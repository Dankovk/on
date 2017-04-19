import { userActionsNames } from './users.actions';

interface IUser {
    userName: string,
    id: number
}

interface IUsersList {
    items: IUser[],
    loading: boolean,
    error: boolean
}

const INITIAL_STATE = {
    items: [],
    loading: false,
    error: false
};

export default function users(state: IUsersList = INITIAL_STATE, action: any) {
    switch (action.type) {
        case userActionsNames.LOAD_SUCCEEDED :
            console.log(action.data);
            return {
                items: [{name: 'sasha', id:"1"}],
                loading: false,
                error: false
            };
        default:
            return state;
    }
}