import { Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import * as io from 'socket.io-client';

import { AppService } from './app.service';
@Component({
	selector: 'zoo-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class AppComponent {
	private socketUrl = 'http://localhost:4112';
	constructor(private service: AppService){}

	refreshApp(data) {
		this.service.getJson();
	}

	ngOnInit() {
		this.service.getJson();
		const socket = io.connect(this.socketUrl);
		socket.on('changed', (data) => {
			this.refreshApp(data);
		})
	}
}
