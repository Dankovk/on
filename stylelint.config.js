module.exports = {
	extends: '@entrada-config/stylelint',
	ignoreFiles: [
		'node_modules/**/*',
		'packages/**/node_modules/**/*',
		'dist/**/*'
	],
	rules: {
		indentation: ['tab']
	}
};

// # Ensure any defined symbols are prefixed with "mdc-"
// # TODO: Remove "md-" pattern.
// custom-media-pattern: ^mdc?-.+
// custom-property-pattern: ^mdc?-.+
// selector-class-pattern:
// 	- ^mdc?-.+
// 	- resolveNestedSelectors: true
// selector-id-pattern: ^mdc?-.+

// # We use Harry Roberts' BEM dialect as our preferred way to format classes.
// # See: http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/
// # See: https://github.com/postcss/postcss-bem-linter/blob/c59db3f/lib/preset-patterns.js#L39
// plugin/selector-bem-pattern:
// eslint-disable-next-line max-len
// 	componentSelectors: ^\.mdc?-{componentName}(?:__[a-z]+(?:-[a-z]+)*)*(?:--[a-z]+(?:-[a-z]+)*)*(?:\[.+\])*$

// # SCSS naming patterns, just like our CSS conventions above.
// # (note for $-vars we use a leading underscore for "private" variables)
// scss/dollar-variable-pattern:
// 	- ^_?mdc-.+
// 	-
// 		ignore: local
// scss/at-function-pattern: ^mdc-.+
// scss/at-mixin-pattern: ^mdc-.+
