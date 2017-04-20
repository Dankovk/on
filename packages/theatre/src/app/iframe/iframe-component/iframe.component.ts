import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from "@angular-redux/store";
import { JsonActions } from '../json-populator/json-populator.actions';

@Component({
    selector: 'iframe-component',
    templateUrl: './iframe.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class IframeComponent {
    // @Input() name: Observable<strung>;
    // @Input() loading: Observable<boolean>;
    // @Input() error: Observable<any>;
    @select(['json', 'demoName']) readonly atomName: Observable<string>;
    // @select(['iframe', 'src']) readonly atomName: Observable<string>;


}