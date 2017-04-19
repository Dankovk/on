import {Injectable} from "@angular/core";
import {NgRedux} from "@angular-redux/store";

export const userActionsNames = {
    LOAD_STARTED: 'users/LOAD_STARTED',
    LOAD_SUCCEEDED: 'users/LOAD_SUCCEEDED',
    LOAD_FAILED: 'users/LOAD_FAILED'
};

@Injectable()
export class UserActions {
    static readonly LOAD_STARTED = userActionsNames.LOAD_STARTED;
    static readonly LOAD_SUCCEEDED = userActionsNames.LOAD_SUCCEEDED;
    static readonly LOAD_FAILED = userActionsNames.LOAD_FAILED;

    constructor(public ngRedux: NgRedux<any>) {
    }

    loadUsers() {
        this.ngRedux.dispatch({
            type: UserActions.LOAD_STARTED
        });
    }

    loadSucceeded(payload) {
        this.ngRedux.dispatch({
            type: UserActions.LOAD_SUCCEEDED,
            data: payload
        });
    }

    loadFailed(error) {
        this.ngRedux.dispatch({
            type: UserActions.LOAD_FAILED,
            data: error
        });
    }
}
