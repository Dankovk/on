import {Component, ChangeDetectionStrategy} from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { IframeService } from './iframe-page.service';

@Component({
    template: `
        <iframe-component
        class="stage"
        ></iframe-component>
    `,
    styleUrls: ['./iframe-page.container.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IframePageComponent {
    private component: string;
    private demoSelected: boolean;
    private sub: any;

    constructor( private route: ActivatedRoute, private service: IframeService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.service.pickComponentAccordingToRoute(params);
        });
    }
}
