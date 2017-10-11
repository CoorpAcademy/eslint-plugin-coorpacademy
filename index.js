'use strict';

const requireIndex = require('requireindex');

module.exports = {
  rules: requireIndex(__dirname + '/rules'),
  configs: {
    ava: require('./config/ava'),
    core: require('./config/core'),
    es20XX: require('./config/es20XX'),
    react: require('./config/react'),
    'lodash-fp': require('./config/lodash-fp'),
    mocha: require('./config/mocha'),
    prettier: require('./config/prettier')
  }
};
