import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../src/rules/no-dangerous-logs';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  }
});

const errors = [
  {
    ruleId: 'no-dangerous-logs',
    message: 'This logging statement may leak sensitive information'
  }
];

ruleTester.run('no-dangerous-logs', rule, {
  valid: [
    'console.log',
    'console.info',
    'console.warn',
    'console.error',
    'console.log(ok)',
    'console.info(ok)',
    'console.warn(ok)',
    'console.error(ok)',
    'context.logger.log.foo(ok)',
    'context.logger.info.foo(ok)',
    'context.logger.warn.foo(ok)',
    'context.logger.error.foo(ok)',
    'foo(context)',
    'console.foo(context)',
    'console.log(process.env.FOO)',
    'console.log(context.brand)'
  ],
  invalid: [
    {
      code: 'console.log(context)',
      errors
    },
    {
      code: 'console.log(ctx)',
      errors
    },
    {
      code: 'console.log(req)',
      errors
    },
    {
      code: 'console.log(a, b, c, d, e, context, f, g, h, i, j)',
      errors
    },
    {
      code: 'console.log(a, b, c, d, e, ctx, f, g, h, i, j)',
      errors
    },
    {
      code: 'console.log(a, b, c, d, e, req, f, g, h, i, j)',
      errors
    },
    {
      code: 'console.info(context)',
      errors
    },
    {
      code: 'console.warn(context)',
      errors
    },
    {
      code: 'console.error(context)',
      errors
    },
    {
      code: 'debug(context)',
      errors
    },
    {
      code: 'debug(ctx)',
      errors
    },
    {
      code: 'debug(req)',
      errors
    },
    {
      code: 'console.log(process.env)',
      errors
    },
    {
      code: 'console.log(process)',
      errors
    },
    {
      code: 'context.logger.error(context)',
      errors
    },
    {
      code: 'console.log(context.config)',
      errors
    },
    {
      code: 'console.log(foo.config)',
      errors
    },
    {
      code: 'console.log(config)',
      errors
    }
  ]
});
