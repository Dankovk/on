import { Component, ChangeDetectionStrategy } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { CounterService } from './counter.service';

@Component({
    template: `
        <div>
            <div>Count: {{countNum | async}}</div>
            <button (click)="service.incrementCounter()">+1</button>
            <button (click)="service.decrementCounter()">-1</button>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CounterPageComponent {

    @select(['counter', 'countNum']) countNum: Observable<number>;
    
    constructor(private service: CounterService){
    }

}
