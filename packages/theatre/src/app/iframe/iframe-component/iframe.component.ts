import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from "@angular-redux/store";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'iframe-component',
    templateUrl: './iframe.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class IframeComponent {
    @select(['json', 'demoName']) readonly demoName: Observable<string>;
    @select(['json', 'selectedComponent', 'name']) readonly atomName: Observable<string>;
    @select(['json', 'src']) readonly src: Observable<string>;
		constructor(private sanitizer: DomSanitizer) {}

	transform(url) {
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}
}
