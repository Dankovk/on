import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from "@angular-redux/store";
import { JsonActions } from '../json-populator/json-populator.actions';
import {DomSanitizationService} from '@angular/platform-browser';

@Component({
    selector: 'iframe-component',
    templateUrl: './iframe.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class IframeComponent {
    @select(['json', 'demoName']) readonly demoName: Observable<string>;
    @select(['json', 'selectedComponent', 'name']) readonly atomName: Observable<string>;
}
