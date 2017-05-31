import { Injectable } from "@angular/core";
import { JsonActions } from "../json-populator/json-populator.actions";
import { Observable } from "rxjs/Observable";
import { select } from "@angular-redux/store";
import { typeEnum } from '../json-populator/json-populator.enum';
import { UtilityService } from '../core/utils/utility.service';

@Injectable()
export class IframeService {
	@select(['json', 'loaded']) readonly loaded: Observable<boolean>;
	private sub: any;

	constructor(private actions: JsonActions, private utils: UtilityService) {}

	pickComponentAccordingToRoute(route) {
		this.sub = this.loaded.subscribe((loaded) => {
			if(loaded) {
				const { type, pattern, component, state, demo } = route;
				const patternSingular = this.utils.depluralize(pattern);
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
					this.actions.demoSelected(patternSingular, component, 'demo', demo, type);
				}
				if (state) {
					this.actions.demoSelected(patternSingular, component, 'state', state, type);
				}
				this.sub.unsubscribe();
			}
		});
	};
}
