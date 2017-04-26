/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env mocha */

import { assert } from 'chai';
import * as attributes from './attributes';


describe('attributes', () => {
	describe('#isArrayPair()', () => {
		it('returns false for nothing/undefined/null', () => {
			assert.isFalse(attributes.isArrayPair());
			assert.isFalse(attributes.isArrayPair(undefined));
			assert.isFalse(attributes.isArrayPair(null));
		});

		it('returns false for a string', () => {
			assert.isFalse(attributes.isArrayPair('string'));
		});

		it('returns false for a number', () => {
			assert.isFalse(attributes.isArrayPair(1));
		});

		it('returns false for a plain object', () => {
			assert.isFalse(attributes.isArrayPair({}));
		});

		it('returns false for array of length !== 2', () => {
			assert.isFalse(attributes.isArrayPair([]));
		});

		it('returns true for array of length 2', () => {
			assert.isTrue(attributes.isArrayPair(['0', '1']));
		});
	});

	describe('#isSingleObjectPair()', () => {
		it('returns false for nothing/undefined/null', () => {
			assert.isFalse(attributes.isSingleObjectPair());
			assert.isFalse(attributes.isSingleObjectPair(undefined));
			assert.isFalse(attributes.isSingleObjectPair(null));
		});

		it('returns false for a string', () => {
			assert.isFalse(attributes.isSingleObjectPair('string'));
		});

		it('returns false for a number', () => {
			assert.isFalse(attributes.isSingleObjectPair(1));
		});

		it('returns false for a plain object', () => {
			assert.isFalse(attributes.isSingleObjectPair({}));
		});

		it('returns false for an array', () => {
			assert.isFalse(attributes.isSingleObjectPair([]));
		});

		it('returns false for a double object pair', () => {
			assert.isFalse(attributes.isSingleObjectPair({ one: 'pair', two: 'pair' }));
		});

		it('returns true for an single object pair', () => {
			assert.isTrue(attributes.isSingleObjectPair({ one: 'pair' }));
		});
	});

	describe('#parsePair()', () => {
		it('returns undefined/null for undefined/null', () => {
			assert.isUndefined(attributes.parsePair(undefined));
			assert.isNull(attributes.parsePair(null));
			// assert.isTrue(S.isNothing(attributes.parsePair(undefined)));
			// assert.isTrue(S.isNothing(attributes.parsePair(null)));
		});

		it('returns a function for nothing (because it\'s curried)', () => {
			assert.isFunction(attributes.parsePair());
		});

		it('parses an array pair', () => {
			assert.equal(attributes.parsePair(['parse', '"this"']), 'parse="this"');
			// assert.isTrue(attributes.parsePair(['parse', '"this"']).equals(S.Just('parse="this"')));
			// assert.isTrue(S.equals(attributes.parsePair(['parse', '"this"']), S.Just('parse="this"')));
		});

		it('parses an object pair', () => {
			assert.equal(attributes.parsePair({ parse: '"that"' }), 'parse="that"');
			// assert.isTrue(S.equals(attributes.parsePair({ parse: '"that"' }), S.Just('parse="that"')));
		});

		it('returns arrays as strings', () => {
			assert.equal(attributes.parsePair([]), '[]');
			// assert.isTrue(S.equals(attributes.parsePair([]), S.Just('[]')));
		});

		it('returns objects as strings', () => {
			assert.equal(attributes.parsePair({}), '{}');
			// assert.isTrue(S.equals(attributes.parsePair({}), S.Just('{}')));
		});

		it('returns strings as strings', () => {
			assert.equal(attributes.parsePair('{test}'), '{test}');
			// assert.isTrue(S.equals(attributes.parsePair('{test}'), S.Just('{test}')));
		});

		it('returns numbers as strings', () => {
			assert.equal(attributes.parsePair(1), '1');
			// assert.isTrue(S.equals(attributes.parsePair(1), S.Just('1')));
		});
	});

	describe('#attributePairs()', () => {
		it('returns [] for undefined/null', () => {
			assert.deepEqual(attributes.attributePairs(undefined), []);
			assert.deepEqual(attributes.attributePairs(null), []);
		});

		it('returns a function for nothing (because it\'s curried)', () => {
			assert.isFunction(attributes.attributePairs());
		});

		it('returns a an empty array for an empty array', () => {
			assert.deepEqual(attributes.attributePairs([]), []);
		});

		it('parses array of strings', () => {
			// Two stings
			assert.deepEqual(attributes.attributePairs(['parse', '"this"']), ['parse', '"this"']);
		});

		it('parses array of strings w/ undefined', () => {
			// Two strings and something undefined
			assert.deepEqual(attributes.attributePairs(['parse', '"that"', undefined]), ['parse', '"that"']);
		});

		it('parses array of array pairs, object pairs, string, & null', () => {
			// Two strings and something undefined
			assert.deepEqual(attributes.attributePairs([['parse', '"this"'], 'and', null, { parse: '"that"' }]), ['parse="this"', 'and', 'parse="that"']);
		});

		it('parses array of multiple array pairs', () => {
			// Two strings and something undefined
			assert.deepEqual(attributes.attributePairs([['parse', '"this"'], ['now', '"that"']]), ['parse="this"', 'now="that"']);
		});
	});

	describe('#attributes()', () => {
		it('return \'\' for undefined/null', () => {
			assert.equal(attributes.attributePairs(undefined), '');
			assert.equal(attributes.attributePairs(null), '');
		});

		it('returns a function for nothing (because it\'s curried)', () => {
			assert.isFunction(attributes.attributes());
		});

		it('returns a an empty array for an empty array', () => {
			assert.equal(attributes.attributePairs([]), '');
		});

		it('parses array of strings', () => {
			// Two stings
			assert.equal(attributes.attributes(['parse', '"this"']), 'parse "this"');
		});

		it('parses array of strings w/ undefined', () => {
			// Two strings and something undefined
			assert.equal(attributes.attributes(['parse', '"that"', undefined]), 'parse "that"');
		});

		it('parses array of array pairs, object pairs, string, & null', () => {
			// Two strings and something undefined
			assert.equal(attributes.attributes([['parse', '"this"'], 'and', null, { parse: '"that"' }]), 'parse="this" and parse="that"');
		});

		it('parses array of multiple array pairs', () => {
			// Two strings and something undefined
			assert.deepEqual(attributes.attributes([['parse', '"this"'], ['now', '"that"']]), 'parse="this" now="that"');
		});
	});
});
