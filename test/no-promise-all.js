import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../src/rules/no-promise-all';

const ruleTester = avaRuleTester(test, {env: {es6: true}});

const errors = [{message: 'Use sequence or traverse instead of promise all'}];

ruleTester.run('no-promise-all', rule, {
  valid: ['promise.resolve'],
  invalid: [
    {
      code: 'Promise.all()',
      errors
    }
  ]
});
