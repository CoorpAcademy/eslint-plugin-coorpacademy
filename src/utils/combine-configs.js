const _ = require('lodash');
const {merge} = require('eslint/lib/config/config-ops');

const combineConfigs = configs => _.reduce(configs, merge);

module.exports = combineConfigs;
