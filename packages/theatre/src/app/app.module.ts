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

// Top-level app component constructs.
import { appRoutes } from './app.routes';
import { AppService } from './app.service';
import { JsonActions } from './json-populator/json-populator.actions';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';

@NgModule({
	declarations: [AppComponent, TopbarComponent],
	imports: [
		RouterModule.forRoot(appRoutes),
		BrowserModule,
		FormsModule,
		HttpModule,
		NgReduxModule,
		NgReduxRouterModule,
		UserModule,
		StoreModule,
	],
	providers: [AppService, JsonActions],
	bootstrap: [AppComponent]
})
export class AppModule {}
