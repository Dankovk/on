import {Component, ChangeDetectionStrategy} from "@angular/core";
import { select } from "@angular-redux/store";
import {Observable} from "rxjs/Observable";
import { IframeService } from './iframe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    template: `
        <iframe-component></iframe-component>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IframePageComponent {

    private atom: string;
    private sub: any;

    constructor(service: IframeService, private route: ActivatedRoute) {
        service.getAll();
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.atom = params['atom'];
        });
    }
}
