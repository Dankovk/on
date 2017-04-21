import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { StoreModule } from '../store/store.module';

import { IframeComponent } from './iframe-component/iframe.component';
import { IframePageComponent } from './iframe-page.container';


@NgModule({
    declarations: [IframeComponent, IframePageComponent],
    exports: [IframeComponent, IframePageComponent],
    imports: [CoreModule, StoreModule, CommonModule]
})

export class IframeModule {}
