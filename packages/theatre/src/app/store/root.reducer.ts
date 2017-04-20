import { combineReducers } from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { iframeReducer } from '../iframe/iframe.reducer';
import { counterReducer } from '../counter/counter.reducer';
import jsonReducer from '../json-populator/json-populator.reducer';

// Define the global store shape by combining our application's
// reducers together into a given structure.
export const rootReducer = composeReducers(
	defaultFormReducer(),
	combineReducers({
		iframe: iframeReducer,
		counter: counterReducer,
		router: routerReducer,
		json: jsonReducer
}));
