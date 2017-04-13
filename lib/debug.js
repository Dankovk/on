/* eslint-disable import/no-extraneous-dependencies, import/prefer-default-export, no-console */
import R from 'ramda';
import util from 'util';

export const trace = R.curry((tag, x) => {
	console.log(util.inspect(x, false, null));
	return x;
});
