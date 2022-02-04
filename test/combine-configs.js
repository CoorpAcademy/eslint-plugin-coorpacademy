import test from 'ava/entrypoints/main.mjs';
import combineConfigs from '../src/utils/combine-configs';

const baseConfig = Object.freeze({
  plugins: ['import'],
  env: {
    browser: false,
    node: true
  },
  rules: {
    eqeqeq: 'off',
    'no-var': 'error'
  }
});

test('should return undefined if there are no configs', t => {
  t.deepEqual(combineConfigs([]), undefined);
});

test('should return config if there are is only one config', t => {
  t.deepEqual(combineConfigs([baseConfig]), baseConfig);
});

test('should merge two configs', t => {
  const otherConfig = {
    env: {mocha: true, node: false},
    plugins: ['mocha'],
    rules: {
      eqeqeq: 'error',
      'no-shadow': 'error'
    }
  };
  t.deepEqual(combineConfigs([otherConfig, baseConfig]), {
    plugins: ['mocha', 'import'],
    env: {
      browser: false,
      mocha: true,
      node: true
    },
    rules: {
      eqeqeq: 'off',
      'no-shadow': 'error',
      'no-var': 'error'
    }
  });
});

test('should merge several configs', t => {
  const otherConfig1 = {
    env: {mocha: true, node: false},
    plugins: ['mocha'],
    rules: {
      eqeqeq: 'error',
      'no-shadow': 'error'
    }
  };
  const otherConfig2 = {
    plugins: ['unicorn'],
    rules: {
      'unicorn/foo': 'error'
    }
  };
  t.deepEqual(combineConfigs([otherConfig1, otherConfig2, baseConfig]), {
    plugins: ['mocha', 'unicorn', 'import'],
    env: {
      browser: false,
      mocha: true,
      node: true
    },
    rules: {
      eqeqeq: 'off',
      'no-shadow': 'error',
      'no-var': 'error',
      'unicorn/foo': 'error'
    }
  });
});
