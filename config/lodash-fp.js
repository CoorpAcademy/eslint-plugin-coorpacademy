'use strict';

module.exports = {
  plugins: [
    'lodash-fp'
  ],
  rules: {
    'lodash-fp/consistent-compose': ['error', 'pipe'],
    'lodash-fp/consistent-name': ['error', '_'],
    'lodash-fp/no-argumentless-calls': 'error',
    'lodash-fp/no-chain': 'error',
    'lodash-fp/no-extraneous-args': 'error',
    'lodash-fp/no-extraneous-function-wrapping': 'error',
    'lodash-fp/no-for-each': 'off',
    'lodash-fp/no-single-composition': 'error',
    'lodash-fp/no-submodule-destructuring': 'error',
    'lodash-fp/prefer-compact': 'error',
    'lodash-fp/prefer-composition-grouping': 'error',
    'lodash-fp/prefer-constant': ['error', {arrowFunctions: false}],
    'lodash-fp/prefer-flat-map': 'error',
    'lodash-fp/preferred-alias': 'off',
    'lodash-fp/prefer-get': 'error',
    'lodash-fp/prefer-identity': ['error', {arrowFunctions: false}],
    'lodash-fp/use-fp': 'error'
  }
};
