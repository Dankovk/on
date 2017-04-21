import {Injectable} from "@angular/core";
import {NgRedux} from "@angular-redux/store";

export const jsonActionsNames = {
    LOAD_STARTED: 'json/LOAD_STARTED',
    LOAD_SUCCEEDED: 'json/LOAD_SUCCEEDED',
    LOAD_FAILED: 'json/LOAD_FAILED',
    COMPONENT_SELECTED: 'json/COMPONENT_SELECTED',
    DEMO_SELECTED: 'json/DEMO_SELECTED'
};

@Injectable()
export class JsonActions {
    static readonly LOAD_STARTED = jsonActionsNames.LOAD_STARTED;
    static readonly LOAD_SUCCEEDED = jsonActionsNames.LOAD_SUCCEEDED;
    static readonly LOAD_FAILED = jsonActionsNames.LOAD_FAILED;
    static readonly COMPONENT_SELECTED = jsonActionsNames.COMPONENT_SELECTED;
    static readonly DEMO_SELECTED = jsonActionsNames.DEMO_SELECTED;

    constructor(public  ngRedux: NgRedux<any>) {
    }

    loadJson() {
        this.ngRedux.dispatch({
            type: JsonActions.LOAD_STARTED
        });
    }

    loadSucceeded(payload) {
        this.ngRedux.dispatch({
            type: JsonActions.LOAD_SUCCEEDED,
            data: payload
        });
    }

    loadFailed(error) {
        this.ngRedux.dispatch({
            type: JsonActions.LOAD_FAILED,
            data: error
        });
    }

    selectComponent(pattern, component) {
        this.ngRedux.dispatch({
            type: JsonActions.COMPONENT_SELECTED,
            component,
            pattern
        });
    }

    demoSelected(name){
        console.log(name);
        this.ngRedux.dispatch({
            type: jsonActionsNames.DEMO_SELECTED,
            name
        })
    }
}