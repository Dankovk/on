import {Injectable} from "@angular/core";
import {NgRedux} from "@angular-redux/store";

export const iframeActionsNames = {
    LOAD_STARTED: 'iframe/LOAD_STARTED',
    LOAD_SUCCEEDED: 'iframe/LOAD_SUCCEEDED',
    LOAD_FAILED: 'iframe/LOAD_FAILED'
};

@Injectable()
export class IframeActions {
    static readonly LOAD_STARTED = iframeActionsNames.LOAD_STARTED;
    static readonly LOAD_SUCCEEDED = iframeActionsNames.LOAD_SUCCEEDED;
    static readonly LOAD_FAILED = iframeActionsNames.LOAD_FAILED;

    constructor(public ngRedux: NgRedux<any>) {
    }

    loadUsers() {
        this.ngRedux.dispatch({
            type: IframeActions.LOAD_STARTED
        });
    }

    loadSucceeded(payload) {
        this.ngRedux.dispatch({
            type: IframeActions.LOAD_SUCCEEDED,
            data: payload
        });
    }

    loadFailed(error) {
        this.ngRedux.dispatch({
            type: IframeActions.LOAD_FAILED,
            data: error
        });
    }
}
