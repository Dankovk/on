import {Component, ChangeDetectionStrategy} from "@angular/core";
import { select } from "@angular-redux/store";
import {Observable} from "rxjs/Observable";
import { ActivatedRoute } from '@angular/router';

@Component({
    template: `
        <iframe-component class="stage"></iframe-component>
    `,
    styleUrls: ['./iframe-page.container.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IframePageComponent {

    private atom: string;
    private sub: any;

    constructor( private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.atom = params['atom'];
        });
    }
}
