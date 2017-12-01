import test from 'ava';
import m from '..';

test('index should contain all configurations', t => {
  t.deepEqual(
    Object.keys(m.configs).sort(),
    ['ava', 'core', 'es20XX', 'flowtype', 'lodash-fp', 'mocha', 'prettier', 'react'].sort()
  );
});

test('index should contain all rules', t => {
  t.deepEqual(
    Object.keys(m.rules).sort(),
    ['no-async-callback', 'no-dangerous-logs', 'use-expect'].sort()
  );
});
