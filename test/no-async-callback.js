const test = require('ava');
const avaRuleTester = require('eslint-ava-rule-tester');
const rule = require('../src/rules/no-async-callback');

const ruleTester = avaRuleTester(test, {
  parserOptions: {
    ecmaVersion: 2017
  }
});

const message = 'Do not use callback parameters inside an async function';

ruleTester.run('no-async-callback', rule, {
  valid: [
    'function foo(cb) {}',
    'async function foo() {}',
    'async (foo) => {}',
    '(cb) => {}',
    'foo(function(cb) {})',
    'foo(async function() {})',
    {
      code: 'async function foo(cb) {}',
      options: [{callbacks: ['bar', 'baz']}]
    }
  ],
  invalid: [
    {
      code: 'async function foo(cb) {}',
      errors: [
        {
          message,
          line: 1,
          column: 20
        }
      ]
    },
    {
      code: 'async function foo(a, b, cb, d) {}',
      errors: [
        {
          message,
          line: 1,
          column: 26
        }
      ]
    },
    {
      code: 'async function foo(done) {}',
      errors: [
        {
          message,
          line: 1,
          column: 20
        }
      ]
    },
    {
      code: 'async function foo(callback) {}',
      errors: [
        {
          message,
          line: 1,
          column: 20
        }
      ]
    },
    {
      code: 'async function foo(next) {}',
      errors: [
        {
          message,
          line: 1,
          column: 20
        }
      ]
    },
    {
      code: 'async (foo, cb) => {}',
      errors: [
        {
          message,
          line: 1,
          column: 13
        }
      ]
    },
    {
      code: 'foo(async function(cb) {})',
      errors: [
        {
          message,
          line: 1,
          column: 20
        }
      ]
    },
    {
      code: 'foo(async function(bar) {})',
      options: [{callbacks: ['bar', 'baz']}],
      errors: [
        {
          message,
          line: 1,
          column: 20
        }
      ]
    },
    {
      code: 'foo(async function(baz) {})',
      options: [{callbacks: ['bar', 'baz']}],
      errors: [
        {
          message,
          line: 1,
          column: 20
        }
      ]
    }
  ]
});
