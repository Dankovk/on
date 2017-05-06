import './polyfill';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { decorateModuleRef } from './environment';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule).then(decorateModuleRef);
