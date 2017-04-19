import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UserListComponent {
    @Input() userName: string;
    @Input() users: Observable<any>;
    @Input() loading: Observable<boolean>;
    @Input() error: Observable<any>;

    getUserName(_, user) {
        return user.name;
    }
}