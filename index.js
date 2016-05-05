'use strict';

module.exports = {
  rules: {},
  configs: {
    ava: require('./config/ava'),
    core: require('./config/core'),
    es20XX: require('./config/es20XX'),
    mocha: require('./config/mocha'),
    jsx: require('./config/jsx')
  },
};
