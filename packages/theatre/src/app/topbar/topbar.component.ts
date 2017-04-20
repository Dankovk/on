import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from "@angular-redux/store";
import { JsonActions } from '../json-populator/json-populator.actions';


@Component({
    selector: 'topbar',
    templateUrl: './topbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
    constructor(private actions: JsonActions){}
    @select(['json', 'data', 'atoms']) readonly atoms: Observable<any[]>;
};