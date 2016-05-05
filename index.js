'use strict';

module.exports = {
  rules: {},
  configs: {
    'ava': require('./config/ava'),
    'core': require('./config/core'),
    'es20XX': require('./config/es20XX'),
    'jsx': require('./config/jsx'),
    'lodash-fp': require('./config/lodash-fp'),
    'mocha': require('./config/mocha')
  },
};
