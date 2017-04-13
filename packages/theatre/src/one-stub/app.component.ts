import { Component } from '@angular/core';

@Component({
	selector: 'one-app',
	templateUrl: 'src/app/app.component.html'
})
export class AppComponent {
	name: string = 'Angular2';

	constructor() {}
}
