import './polyfill';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { decorateModuleRef } from './environment';

// import { AppModule } from './one/index';
import { AppModule } from './app/index';

platformBrowserDynamic().bootstrapModule(AppModule).then(decorateModuleRef);
