import {Component, ChangeDetectionStrategy} from "@angular/core";
import { select } from "@angular-redux/store";
import {Observable} from "rxjs/Observable";
import { UsersService } from './users.service';

@Component({
    template: `
        <ul>
          <li *ngFor="let user of users | async;">
            {{ user.name }}
          </li>
        </ul>
`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPageComponent {
    // Get elephant-related data out of the Redux store as observables.
    @select(['users', 'items']) readonly users: Observable<any[]>;
    @select(['users', 'loading']) readonly loading: Observable<boolean>;
    @select(['users', 'error']) readonly error: Observable<any>;

    constructor(service: UsersService) {
        service.getAll();
    }
}
