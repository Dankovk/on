import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { StoreModule } from '../store/store.module';

// import { CounterComponent } from './counter/counter.component';
import { CounterPageComponent } from './counter-page.container';

import { CounterActions } from './counter.actions';
import { CounterService } from './counter.service';

@NgModule({
    declarations: [CounterPageComponent],
    exports: [CounterPageComponent],
    imports: [CoreModule, StoreModule, CommonModule],
    providers: [CounterActions, CounterService]
})

export class CounterModule {}