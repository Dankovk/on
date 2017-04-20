import { IframePageComponent } from './iframe/iframe-page.container';


export const appRoutes = [
	{path: '', redirectTo: '/', pathMatch: 'full'},
	{path: 'components', component: IframePageComponent},
	{path: 'components/atoms/:atom', component: IframePageComponent}
];
