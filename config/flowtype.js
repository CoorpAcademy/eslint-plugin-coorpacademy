'use strict';

module.exports = {
  plugins: ['flowtype', 'flowtype-errors'],
  rules: {
    'flowtype-errors/show-errors': 'error',
    'flowtype/boolean-style': ['error', 'boolean'],
    'flowtype/define-flow-type': 'error',
    'flowtype/no-primitive-constructor-types': 'error',
    'flowtype/no-types-missing-file-annotation': 'error',
    'flowtype/no-weak-types': 'error',
    'flowtype/require-parameter-type': ['error', {excludeArrowFunctions: true}],
    'flowtype/require-return-type': ['error', 'always', {excludeArrowFunctions: 'expressionsOnly'}],
    'flowtype/type-id-match': ['error', '^([A-Z][a-z0-9]*)+$'],
    'flowtype/use-flow-type': 'error'
  },
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true
    }
  }
};
