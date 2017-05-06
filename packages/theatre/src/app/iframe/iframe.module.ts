import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '../store/store.module';

import { UtilityService } from '../core/utils/utility.service';

import { IframeComponent } from './iframe-component/iframe.component';
import { IframePageComponent } from './iframe-page.container';
import { IframeService } from './iframe-page.service';


@NgModule({
	declarations: [IframeComponent, IframePageComponent],
	exports: [IframeComponent, IframePageComponent],
	imports: [StoreModule, CommonModule],
	providers: [IframeService, UtilityService]
})

export class IframeModule {}
