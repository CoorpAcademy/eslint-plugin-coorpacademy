const test = require('ava');
const avaRuleTester = require('eslint-ava-rule-tester');
const rule = require('../src/rules/no-overwriting-spread');

const ruleTester = avaRuleTester(test, {
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true
    }
  }
});

const message = 'Set individual properties after the spread properties';

const objectError = {
  message,
  type: 'ObjectExpression'
};
const jsxError = {
  message,
  type: 'JSXOpeningElement'
};

ruleTester.run('no-overwriting-spread', rule, {
  valid: [
    '+{}',
    '+{a: 1}',
    '+{a: 1, b: 2}',
    '+{...a}',
    '+{...a, b: 1}',
    '+{...a, b: 1, c: 2}',
    '+{...a, ...b}',
    '+{...a, ...b, c: 1}',
    '[]',
    '[...a]',
    '[1]',
    '[1, ...a]',
    '[...a, 1]',
    'let e = <Foo bar={a} />',
    'let e = <Foo bar={a} baz={b} />',
    'let e = <Foo {...props} />',
    'let e = <Foo {...props} bar={a} />',
    'let e = <Foo {...props1} {...props2} />'
  ],
  invalid: [
    {
      code: '+{a: 1, ...b}',
      errors: [objectError]
    },
    {
      code: '+{a: 1, b: 2, ...c}',
      errors: [objectError]
    },
    {
      code: '+{...a, b: 1, ...c}',
      errors: [objectError]
    },
    {
      code: 'let e = <Foo bar={a} {...props} />',
      errors: [jsxError]
    },
    {
      code: 'let e = <Foo bar={a} {...props}>{children}</Foo>',
      errors: [jsxError]
    },
    {
      code: 'let e = <Foo {...props1} bar={a} {...props2} />',
      errors: [jsxError]
    }
  ]
});
