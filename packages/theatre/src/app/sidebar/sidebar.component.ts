import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from "@angular-redux/store";


@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SidebarComponent {
    @select(['json', 'selectedComponent', 'states' ]) readonly states: Observable<any>;
    @select(['json', 'selectedComponent', 'demos' ]) readonly demos: Observable<any>;
};