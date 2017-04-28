import {Injectable} from "@angular/core";
import {JsonActions} from "../json-populator/json-populator.actions";
import {Observable} from "rxjs/Observable";
import {select} from "@angular-redux/store";
import { typeEnum } from '../json-populator/json-populator.enum';

@Injectable()
export class IframeService {
    @select(['json', 'loaded']) readonly loaded: Observable<boolean>;

    constructor(private actions: JsonActions) {}

    pickComponentAccordingToRoute(route) {
        this.loaded.subscribe((loaded) => {
            if(loaded) {
                const {type, pattern, component, state, demo} = route;
                if (type) {
                    this.actions.selectType(type)
                }
                if (pattern) {
                    //should implement when pattern will be affecting UI, for now - not needed
                }
                if (component) {
                    this.actions.selectComponent(pattern, component);
                }
                if (demo) {
                    this.actions.demoSelected(pattern, component, 'demo', demo, type);
                }
                if (state) {
                    this.actions.demoSelected(pattern, component, 'state', state, type);
                }
            }
        });
    };
}



