'use strict';

module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  plugins: ['jsx'],
  rules: {
    'jsx/uses-factory': ['error', {pragma: 'h'}],
    'jsx/factory-in-scope': ['error', {pragma: 'h'}],
    'jsx/mark-used-vars': 'error',
    'jsx/no-undef': 'error'
  }
};
