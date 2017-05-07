import './polyfills.browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { decorateModuleRef } from './environment';

platformBrowserDynamic().bootstrapModule(AppModule).then(decorateModuleRef);
