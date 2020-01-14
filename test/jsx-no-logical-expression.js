import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../src/rules/jsx-no-logical-expression';

const ruleTester = avaRuleTester(test, {
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true
    }
  }
});

const ruleId = 'jsx-no-logical-expression';
const message = 'JSX should not use logical expression';

const error = {
  ruleId,
  message,
  type: 'LogicalExpression'
};

ruleTester.run(ruleId, rule, {
  valid: [
    '{true ? <div /> : null}',
    '{false || false ? <div /> : null}',
    '{true && true ? <div /> : null}'
  ],
  invalid: [
    {
      code: '{true && <div />}',
      output: '{true ? <div /> : null}',
      errors: [error]
    },
    {
      code: '{foo || <div />}',
      output: '{foo ? foo : <div />}',
      errors: [error]
    },
    {
      code: '{false && <div />}',
      output: '{false ? <div /> : null}',
      errors: [error]
    },
    {
      code: '{undefined && <div />}',
      output: '{undefined ? <div /> : null}',
      errors: [error]
    },
    {
      code: '{0 && <div />}',
      output: '{0 ? <div /> : null}',
      errors: [error]
    }
  ]
});
