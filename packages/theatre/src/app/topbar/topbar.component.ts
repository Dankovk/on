import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from "@angular-redux/store";
import { JsonActions } from '../json-populator/json-populator.actions';


@Component({
    selector: 'topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
    constructor(private actions: JsonActions){
    }

    @select(['json', 'componentType']) readonly componentType: Observable<string>;
    @select(state => state.json.data[state.json.componentType].atoms) readonly atoms: Observable<any[]>;
}
