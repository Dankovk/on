import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

export const counterActionsNames = {
    INCREMENT_COUNTER: 'counter/INCREMENT_COUNTER',
    DECREMENT_COUNTER: 'counter/DECREMENT_COUNTER'
};

@Injectable()
export class CounterActions {
    static readonly INCREMENT_COUNTER = counterActionsNames.INCREMENT_COUNTER;
    static readonly DECREMENT_COUNTER = counterActionsNames.DECREMENT_COUNTER;
    
    constructor(public ngRedux: NgRedux<any>) {

    }
    
    incrementCounter() {
        this.ngRedux.dispatch({
            type: CounterActions.INCREMENT_COUNTER,
        })
    }
    
    decrementCounter() {
        this.ngRedux.dispatch({
            type: CounterActions.DECREMENT_COUNTER,
        })
    }
}
