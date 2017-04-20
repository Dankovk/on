import { Injectable } from '@angular/core';
import { CounterActions } from './counter.actions';

@Injectable()
export class CounterService {
    constructor(private actions: CounterActions) {}

    incrementCounter(){
        this.actions.incrementCounter();
    }
    
    decrementCounter(){
        this.actions.decrementCounter();
    }

}