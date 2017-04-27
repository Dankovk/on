import {IframePageComponent} from "./iframe/iframe-page.container";


export const appRoutes = [
	{	path: '',
		pathMatch: 'full',
		component: IframePageComponent,
	},
	{
		path: ':type',
		component: IframePageComponent
	},
	{
		path: ':type/:pattern',
		component: IframePageComponent
	},
	{
		path: ':type/:pattern/:component',
		component: IframePageComponent
	},
	{
		path: ':type/:pattern/:component/state/:state',
		component: IframePageComponent
	},
	{
		path: ':type/:pattern/:component/demo/:demo',
		component: IframePageComponent
	}
];
