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
    // @Input() name: Observable<strung>;
    // @Input() loading: Observable<boolean>;
    // @Input() error: Observable<any>;
    @select(['json', 'demoName']) readonly demoName: Observable<string>;
    @select(['json', 'selectedComponent', 'name']) readonly atomName: Observable<string>;

    // static get parameters() {
    //     return [DomSanitizationService];
    // }
    // constructor(private sanitizer: DomSanitizationService) {
    //     this.sanitizer = sanitizer;
    // }
    //
    // photoURL() {
    //     console.log(demoName);
    //     // return this.sanitizer.bypassSecurityTrustUrl(''+atomName+demoName+'');
    // }
    // photoURL() {
    //     return this.sanitizer.bypassSecurityTrustUrl('http://localhost:3000/components/atoms/'+this.demoName+this.atomName+'html');
    // }
}