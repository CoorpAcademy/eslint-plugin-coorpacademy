const {RuleTester} = require('eslint');
const rule = require('../rules/eager-calls')

const ruleTester = new RuleTester({
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const errors = [{
  message: 'Call could be made in a parent function.'
}]

ruleTester.run('eager-calls', rule, {
  valid: [
    `foo(Array)`,
    `const a = 2; const b = 3; foo(a, b)`,
    `foo()`,
    `foo(a)(b)`,
    `foo()(a, b)`,
    ` function foo(a, b) {
        return bar(a, b);
      }
    `,
    ` function foo(a, b) {
        const b = a + 1;
        return (c) => bar(b, c);
      }
    `,
    ` function foo() {
        return bar(arguments);
      }
    `,
    `const foo = (a, b) => bar(a, b);`,
    `const foo = (a, b) => bar(b, d);`,
    `const foo = (a, b) => bar(c, a);`,
    `const foo = (a, b) => bar(b, a);`,
    ` const c = 1;
      const foo = (a, b) => bar(a, b)(c);
    `,
    `const foo = (fn, a) => fn(a);`,
    `const foo = (a) => (fn) => fn(a);`,
    `const foo = (a) => (b) => b.fn(a);`,
    `const foo = (a, c) => (b) => a.d[b].fn(c);`,
    `const foo = (a, c) => (b) => b.d[a].fn(c);`,
    `const foo = (a, c) => (b) => b[b[a]].fn(c);`,
    `
    const createItem = ({h}, options) => (props, children) => children;
    export default (treant, options) => {
      const {h} = treant;
      const Item = createItem(treant, options);
      return (props, children) => {
        return Item(children);
      };
    };
    `
  ],
  invalid: [
    {
      code: `
        function foo(a, b) {
          return bar(c, d);
        }
      `,
      errors
    },
    {
      code: `
        function foo() {
          return (a) => bar(arguments);
        }
      `,
      errors
    },
    {
      code: `
        function foo(a, b) {
          const b = a + 1;
          return () => bar(b);
        }
      `,
      errors
    },
    {
      code: `const foo = (a, c) => (b) => a.fn(c);`,
      errors
    },
    {
      code: `const foo = (a, c) => (b) => a.b.fn(c);`,
      errors
    },
    {
      code: `const foo = (a, c) => (b) => a.d.fn(c);`,
      errors
    },
    {
      code: `const foo = (a, c) => (b) => a.d().fn(c);`,
      errors
    },
    {
      code: `const foo = (a, c) => (b) => a.d['b'].fn(c);`,
      errors
    },
    {
      code: `const foo = (a, c) => (b) => a.d[a].fn(c);`,
      errors
    },
    {
      code: `const foo = (a, b) => bar(c, d);`,
      errors
    },
    {
      code: `
        const c = 1;
        function foo(a, b) {
          return bar(c)(a, b);
        }
      `,
      errors
    },
    {
      code: `
        const createItem = ({h}, options) => (props, children) => children;
        export default (treant, options) => {
          const {h} = treant;
          return (props, children) => {
            const Item = createItem(treant, options);
            return Item(children);
          };
        };
      `,
      errors
    }
  ]
});
