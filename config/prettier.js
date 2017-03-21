'use strict';

const prettierConfig = require('eslint-config-prettier');

module.exports = {
  plugins: ['prettier'],
  rules: Object.assign({}, prettierConfig.rules, {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 100,
        bracketSpacing: false
      }
    ]
  })
};
