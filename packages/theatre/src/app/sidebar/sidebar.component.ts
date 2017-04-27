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
    private componentName: string;
    private componentPattern: string;
    @select (['json', 'componentType']) readonly componentType: Observable<string>;
    @select(['json', 'selectedComponent', 'name'])  name: Observable<string>;
    @select(['json', 'selectedComponent', 'pattern'])  pattern: Observable<string>;
    @select(['json', 'selectedComponent', 'states' ]) readonly states: Observable<any>;
    @select(['json', 'selectedComponent', 'demos' ]) readonly demos: Observable<any>;

    ngOnInit() {
        this.name.subscribe((data) => {
           this.componentName = data
        });
        this.pattern.subscribe((data) => {
            this.componentPattern = data
        });
    }

    selectDemo(demoType, demo) {
        this.actions.demoSelected(this.componentPattern, this.componentName, demoType, demo);
    }
};
