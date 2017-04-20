import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { AppService } from './app.service';
@Component({
	selector: 'zoo-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	title = 'Welcome to theatre';
	constructor(private service: AppService){}

	ngOnInit() {
		this.service.getJson();
	}
}
