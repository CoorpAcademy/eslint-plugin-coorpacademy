module.exports = {
  env: {
    mocha: true
  },
  plugins: ['mocha', 'chai-expect'],
  rules: {
    'mocha/handle-done-callback': 'error',
    'mocha/max-top-level-suites': 'off',
    'mocha/no-async-describe': 'error',
    'mocha/no-empty-description': 'error',
    'mocha/no-exclusive-tests': 'error',
    'mocha/no-exports': 'error',
    'mocha/no-global-tests': 'error',
    'mocha/no-hooks-for-single-case': 'off',
    'mocha/no-hooks': 'off',
    'mocha/no-identical-title': 'error',
    'mocha/no-mocha-arrows': 'error',
    'mocha/no-nested-tests': 'error',
    'mocha/no-pending-tests': 'error',
    'mocha/no-return-and-callback': 'error',
    'mocha/no-return-from-async': 'error',
    'mocha/no-setup-in-describe': 'off',
    'mocha/no-sibling-hooks': 'error',
    'mocha/no-skipped-tests': 'error',
    'mocha/no-synchronous-tests': 'off',
    'mocha/no-top-level-hooks': 'error',
    'mocha/prefer-arrow-callback': 'off',
    'mocha/valid-suite-description': 'off',
    'mocha/valid-test-description': 'off',

    'chai-expect/no-inner-compare': 'error',
    'chai-expect/no-inner-literal': 'error',
    'chai-expect/missing-assertion': 'error',
    'chai-expect/terminating-properties': 'error'
  }
};
