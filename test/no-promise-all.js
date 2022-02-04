const test = require('ava');
const avaRuleTester = require('eslint-ava-rule-tester');
const rule = require('../src/rules/no-promise-all');

const ruleTester = avaRuleTester(test, {
  parserOptions: {
    ecmaVersion: 2017
  }
});

const errors = [
  {message: 'Prefer Promise.allSettled or pSettle like logic instead of Promise.all'}
];

ruleTester.run('no-promise-all', rule, {
  valid: ['Promise.resolve()', 'foo.promise()', 'Promise.race()', 'Promise.reject()'],
  invalid: [
    {
      code: 'Promise.all()',
      errors
    },
    {
      code: 'async function foo() {return Promise.all([])}',
      errors
    },
    {
      code: 'async function foo() {await Promise.all([])}',
      errors
    }
  ]
});
