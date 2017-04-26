import { Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit } from '@angular/core';

import { AppService } from './app.service';
@Component({
	selector: 'zoo-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class AppComponent {
	constructor(private service: AppService){}

	ngOnInit() {
		this.service.getJson();
	}
}
