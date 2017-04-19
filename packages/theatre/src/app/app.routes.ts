import { UserPageComponent } from './users/user-page.container';


export const appRoutes = [
	{ path: '', redirectTo: '/users', pathMatch: 'full' },
	{ path: 'users', component: UserPageComponent },
];
