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
}

export default function users(state: IUsersList = INITIAL_STATE, action: any ) {
    console.log('Its users');
    console.log(action);
    return state;
}