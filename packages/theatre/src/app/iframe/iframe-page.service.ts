import {Injectable} from "@angular/core";
import {JsonActions} from "../json-populator/json-populator.actions";
import {Observable} from "rxjs/Observable";
import {select} from "@angular-redux/store";


const typeEnum = {
    'angular': 'angularType',
    'static': 'staticType'
};

@Injectable()
export class IframeService {
    @select(['json', 'loaded']) readonly loaded: Observable<boolean>;

    constructor(private actions: JsonActions) {}

    pickComponentAccordingToRoute(route) {
        this.loaded.subscribe((loaded) => {
            if(loaded) {
                const {type, pattern, component, state, demo} = route;
                if (type) {
                    this.actions.typeSelected(typeEnum[type])
                }
                if (pattern) {
                    //should implement when pattern shall affect UI
                }
                if (component) {
                    this.actions.selectComponent(pattern, component);
                }
                if (demo) {
                    this.actions.demoSelected(pattern, component, 'demo', demo);
                }
                if (state) {
                    this.actions.demoSelected(pattern, component, 'state', state);
                }
            }
        });

    };
}



