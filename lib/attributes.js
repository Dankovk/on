/* NOTE: remove this if attributes moves to its own library? */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import R from 'ramda';
import _ from 'lodash';

export const isArrayPair = (obj) => _.isArray(obj) && obj.length === 2;

export const isSingleObjectPair = (obj) => _.isPlainObject(obj) && Object.keys(obj).length === 1;

/* eslint-disable no-multi-spaces */
export const parsePair = R.curry(R.cond([
	[R.isNil,            R.identity], // just return null/undefined values
	[isArrayPair,        R.join('=')],
	[isSingleObjectPair, R.compose(R.join('='), R.flatten, R.toPairs)],
	[_.isString,         R.identity],
	[R.T,                R.toString]
]));
/* eslint-enable no-multi-spaces */

export const attributePairs = R.curry(R.ifElse(
  R.isNil, R.always([]), R.compose(_.compact, R.map(parsePair))
));

/* eslint-disable no-multi-spaces */
export const attributes = R.curry(R.compose(R.join(' '), attributePairs));
/* eslint-enable no-multi-spaces */
