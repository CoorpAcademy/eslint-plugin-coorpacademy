'use strict';

const requireIndex = require('requireindex');

module.exports = {
  combineConfigs: require('./utils/combine-configs'),
  rules: requireIndex(__dirname + '/rules'),
  configs: requireIndex(__dirname + '/config')
};
