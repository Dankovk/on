import { UserPageComponent } from './users/user-page.container';
import { CounterPageComponent } from './counter/counter-page.container';


export const appRoutes = [
	{ path: '', redirectTo: '/users', pathMatch: 'full' },
	{ path: 'users', component: UserPageComponent },
	{ path: 'counter', component: CounterPageComponent },
];
