import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from "@angular-redux/store";
import { JsonActions } from '../json-populator/json-populator.actions';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SidebarComponent {

    constructor(private actions: JsonActions){}
    @select(['json', 'selectedComponent', 'states' ]) readonly states: Observable<any>;
    @select(['json', 'selectedComponent', 'demos' ]) readonly demos: Observable<any>;
};
