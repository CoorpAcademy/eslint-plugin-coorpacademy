#!/usr/bin/env node
/* eslint-disable no-console, fp/no-loops */

const _ = require('lodash/fp');
const getRuleFinder = require('eslint-find-rules');

const allConfigs = [
  'ava',
  'core',
  'css-modules',
  'es20XX',
  'lodash-fp',
  'mocha',
  'prettier',
  'react'
];
const ignorePlugins = ['json'];

const then = f => p => p.then(f);

const getUnusedRules = async configName => {
  if (!allConfigs.includes(configName)) throw new Error(`unknown config named ${configName}`);
  const finderConfig = configName === 'core' ? {} : {omitCore: true};
  const ruleFinder = await getRuleFinder(
    `${__dirname}/../src/config/${configName}.js`,
    finderConfig
  );
  return ruleFinder.getUnusedRules();
};

const filterIgnoreRules = _.filter(rule =>
  _.all(plugin => !rule.startsWith(`${plugin}/`), ignorePlugins)
);

if (!module.parent) {
  const main = async () => {
    const configs =
      !process.argv[2] || /^\$?all$/i.test(process.argv[2]) ? allConfigs : process.argv.slice(2);

    const brokenConfigs = [];
    for (const config of configs) {
      const unusedRules = await _.pipe(getUnusedRules, then(filterIgnoreRules))(config);
      if (!_.isEmpty(unusedRules)) {
        console.log(`Some rules are unused in ${config}`);
        unusedRules.forEach(rule => console.log(`- ${rule}`));
        brokenConfigs.push(config);
      }
    }
    if (!_.isEmpty(brokenConfigs)) {
      console.log(`Following configs are broken: ${brokenConfigs.join(', ')}`);
      process.exit(1);
    }
  };

  main();
}
