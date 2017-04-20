import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from "@angular-redux/store";


@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TopbarComponent {
    @select(['json', 'data', 'atoms']) readonly atoms: Observable<any[]>;
};