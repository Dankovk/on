import {Component, ChangeDetectionStrategy, OnInit} from "@angular/core";
import {select} from "@angular-redux/store";
import {Observable} from "rxjs/Observable";
import { UsersService } from './users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    template: `<component></component>
        <iframe src="http://localhost:3000/components/atoms/header_1.html" frameborder="0"></iframe>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPageComponent {
    // Get elephant-related data out of the Redux store as observables.
    @select(['users', 'items']) readonly users: Observable<any[]>;
    @select(['users', 'loading']) readonly loading: Observable<boolean>;
    @select(['users', 'error']) readonly error: Observable<any>;
    private atom: string;
    private sub: any;

    constructor(service: UsersService, private route: ActivatedRoute) {
        service.getAll();
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.atom = params['atom'];
        });
    }
}
