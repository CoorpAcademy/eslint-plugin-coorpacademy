const test = require('ava');
const m = require('..');

test('index should contain combineConfigs function', t => {
  t.is(typeof m.combineConfigs, 'function');
});

test('index should contain all configurations', t => {
  t.deepEqual(
    Object.keys(m.configs).sort(),
    ['ava', 'core', 'es20XX', 'lodash-fp', 'mocha', 'prettier', 'react', 'css-modules'].sort()
  );
});

test('index should contain all rules', t => {
  t.deepEqual(
    Object.keys(m.rules).sort(),
    [
      'no-async-callback',
      'no-dangerous-logs',
      'no-overwriting-spread',
      'jsx-no-logical-expression',
      'no-promise-all'
    ].sort()
  );
});
