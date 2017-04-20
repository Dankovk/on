import { UserPageComponent } from './users/user-page.container';
import { CounterPageComponent } from './counter/counter-page.container';


export const appRoutes = [
	{path: '', redirectTo: '/', pathMatch: 'full'},
	{path: 'users', component: UserPageComponent},
	{ path: 'counter', component: CounterPageComponent },
	{path: 'components', component: UserPageComponent},
	{path: 'components/atoms/:atom', component: UserPageComponent}
];
