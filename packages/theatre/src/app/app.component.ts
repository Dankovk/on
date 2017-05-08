import { Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select } from "@angular-redux/store";
import { Observable } from "rxjs/Observable";
import * as io from 'socket.io-client';

import { AppService } from './app.service';
@Component({
	selector: 'theatre-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class AppComponent {
	@select (['json', 'selectedComponent']) readonly selectedComponent: Observable<any>;
	private socketUrl = 'http://localhost:4112';
	private params: Object;
	private sub: any;
	private componentSelected: boolean;
	constructor(private service: AppService, private route: ActivatedRoute){}

	refreshApp() {
		this.service.getJson();
	}


	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.params = params;
		});
		this.service.getJson();
		const socket = io.connect(this.socketUrl);
		socket.on('changed', () => {
			this.refreshApp();
		});
		this.selectedComponent.subscribe( component => {
			this.componentSelected = component && component.pattern && component.pattern != "" && component.name && component.name != "";
		})
	}
}
