'use strict';

module.exports = {
	env: {
		es6: true
	},
	plugins: [
		'ava'
	],
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module'
	},
	rules: {
		'ava/assertion-message': ['off', 'always'],
		'ava/max-asserts': ['off', 5],
		'ava/no-cb-test': 'off',
		'ava/no-identical-title': 'error',
		'ava/no-ignored-test-files': 'error',
		'ava/no-invalid-end': 'error',
		'ava/no-only-test': 'error',
		'ava/no-skip-assert': 'error',
		'ava/no-skip-test': 'error',
		'ava/no-statement-after-end': 'error',
		'ava/no-todo-test': 'warn',
		'ava/no-unknown-modifiers': 'error',
		'ava/prefer-power-assert': 'off',
		'ava/test-ended': 'error',
		'ava/test-title': ['error', 'always'],
		'ava/use-t-well': 'error',
		'ava/use-t': 'error',
		'ava/use-test': 'error',
		'ava/use-true-false': 'error'
	}
};
