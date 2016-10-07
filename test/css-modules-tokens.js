const {RuleTester} = require('eslint');
const rule = require('../rules/css-modules-tokens')
// const rule = require('../rules/eager-calls')

const ruleTester = new RuleTester({
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const error = {
  message: 'CSS modules not working'
};

ruleTester.run('css-modules-tokens', rule, {
  valid: [
    {
      code: `const styles = require('./fixtures/styles.css');
      styles.default
      `,
      filename: __filename
    }
  ],
  invalid: [
    {
      code: `
        const styles = require('./fixtures/styles.css');
        styles.i_dont_exist
      `,
      filename: __filename,
      errors: [{
        message: 'styles.i_dont_exist does not exist'
      }]
    }
  ]
});
