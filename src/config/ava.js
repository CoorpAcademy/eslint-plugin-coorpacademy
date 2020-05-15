module.exports = {
  env: {
    es6: true
  },
  plugins: ['ava'],
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module'
  },
  rules: {
    'ava/assertion-arguments': 'error',
    'ava/assertion-message': ['off', 'always'],
    'ava/hooks-order': 'error',
    'ava/max-asserts': ['off', 5],
    'ava/no-async-fn-without-await': 'error',
    'ava/no-cb-test': 'off',
    'ava/no-duplicate-modifiers': 'error',
    'ava/no-identical-title': 'error',
    'ava/no-ignored-test-files': 'error',
    'ava/no-incorrect-deep-equal': 'error',
    'ava/no-invalid-end': 'error',
    'ava/no-inline-assertions': 'error',
    'ava/no-import-test-files': 'error',
    'ava/no-nested-tests': 'error',
    'ava/no-only-test': 'error',
    'ava/no-skip-assert': 'error',
    'ava/no-skip-test': 'error',
    'ava/no-statement-after-end': 'error',
    'ava/no-todo-test': 'warn',
    'ava/no-todo-implementation': 'error',
    'ava/no-unknown-modifiers': 'error',
    'ava/prefer-async-await': 'error',
    'ava/prefer-power-assert': 'off',
    'ava/prefer-t-regex': 'error',
    'ava/test-ended': 'error',
    'ava/test-title': ['error', 'always'],
    'ava/test-title-format': 'off',
    'ava/use-t-well': 'error',
    'ava/use-t': 'error',
    'ava/use-t-throws-async-well': 'error',
    'ava/use-test': 'error',
    'ava/use-true-false': 'error'
  }
};
