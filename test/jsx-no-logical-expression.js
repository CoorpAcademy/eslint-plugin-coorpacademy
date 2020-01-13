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
      errors: [error]
    },
    {
      code: '{true || <div />}',
      errors: [error]
    },
    {
      code: '{false && <div />}',
      errors: [error]
    },
    {
      code: '{undefined && <div />}',
      errors: [error]
    },
    {
      code: '{0 && <div />}',
      errors: [error]
    }
  ]
});
