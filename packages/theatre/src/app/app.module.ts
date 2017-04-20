import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgReduxModule } from '@angular-redux/store';
import { NgReduxRouterModule } from '@angular-redux/router';

// This app's ngModules
import { StoreModule } from './store/store.module';
import { UserModule } from './users/users.module';
import { CounterModule } from './counter/counter.module';

// Top-level app component constructs.
import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		RouterModule.forRoot(appRoutes),
		BrowserModule,
		FormsModule,
		HttpModule,
		NgReduxModule,
		NgReduxRouterModule,
		UserModule,
		CounterModule,
		StoreModule,
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
