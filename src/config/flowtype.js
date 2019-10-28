module.exports = {
  plugins: ['flowtype', 'flowtype-errors'],
  rules: {
    'flowtype-errors/enforce-min-coverage': ['error', 100],
    'flowtype-errors/show-errors': 'error',
    'flowtype-errors/show-warnings': 'warn',

    'flowtype/boolean-style': ['error', 'boolean'],
    'flowtype/define-flow-type': 'error',
    'flowtype/no-primitive-constructor-types': 'error',
    'flowtype/no-types-missing-file-annotation': 'error',
    'flowtype/no-weak-types': 'error',
    'flowtype/require-parameter-type': ['error', {excludeArrowFunctions: true}],
    'flowtype/require-return-type': ['error', 'always', {excludeArrowFunctions: 'expressionsOnly'}],
    'flowtype/type-id-match': ['error', '^([A-Z][a-z0-9]*)+$'],
    'flowtype/use-flow-type': 'error',
    'flowtype/delimiter-dangle': 'off',
    'flowtype/generic-spacing': 'off',
    'flowtype/newline-after-flow-annotation': 'off',
    'flowtype/no-dupe-keys': 'error',
    'flowtype/no-existential-type': 'off',
    'flowtype/no-flow-fix-me-comments': 'warn',
    'flowtype/no-mutable-array': 'off',
    'flowtype/no-unused-expressions': 'off',
    'flowtype/object-type-delimiter': 'off',
    'flowtype/require-exact-type': 'off',
    'flowtype/require-types-at-top': 'off',
    'flowtype/require-valid-file-annotation': ['error', 'always', {annotationStyle: 'line'}],
    'flowtype/require-variable-type': 'off',
    'flowtype/semi': 'off',
    'flowtype/sort-keys': 'off',
    'flowtype/space-after-type-colon': 'off',
    'flowtype/space-before-generic-bracket': 'off',
    'flowtype/space-before-type-colon': 'off',
    'flowtype/type-import-style': 'off',
    'flowtype/union-intersection-spacing': 'off',
    'flowtype/array-style-complex-type': 'warn',
    'flowtype/array-style-simple-type': 'warn',
    'flowtype/require-compound-type-alias': 'warn',
    'flowtype/no-mixed': 'warn',

    'flowtype/arrow-parens': 'off',
    'flowtype/require-indexer-name': 'off',
    'flowtype/require-inexact-type': 'off',
    'flowtype/require-readonly-react-props': 'warn',
    'flowtype/spread-exact-type': 'warn'
  },
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true
    }
  }
};
