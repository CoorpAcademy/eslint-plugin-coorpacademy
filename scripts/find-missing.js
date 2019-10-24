#!/usr/bin/env node
/* eslint-disable no-console, fp/no-loops */

const _ = require('lodash/fp');
const getRuleFinder = require('eslint-find-rules');

const allConfigs = [
  'ava',
  'core',
  'css-modules',
  'es20XX',
  'flowtype',
  'lodash-fp',
  'mocha',
  'prettier',
  'react'
];
const ignorePlugins = ['json'];

const getUnusedRules = configName => {
  if (!allConfigs.includes(configName)) throw new Error(`unknown config named ${configName}`);
  const finderConfig = configName === 'core' ? {} : {omitCore: true};
  const ruleFinder = getRuleFinder(`${__dirname}/../src/config/${configName}.js`, finderConfig);
  return ruleFinder.getUnusedRules();
};

const filterIgnoreRules = _.filter(rule =>
  _.all(plugin => !rule.startsWith(`${plugin}/`), ignorePlugins)
);

if (!module.parent) {
  const configs =
    !process.argv[2] || /^\$?all$/i.test(process.argv[2]) ? allConfigs : process.argv.slice(2);

  for (const config of configs) {
    const unusedRules = _.pipe(
      getUnusedRules,
      filterIgnoreRules
    )(config);
    if (!_.isEmpty(unusedRules)) {
      console.log(`Some rules are unused in ${config}`);
      unusedRules.forEach(rule => console.log(`- ${rule}`));
      process.exit(1);
    }
  }
}
