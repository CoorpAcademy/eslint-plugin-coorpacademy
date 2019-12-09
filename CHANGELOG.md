# Changelog

Here is list of rules modifications. (starting from v9)
## 9.1
### core
Introduced:
- prefer-regex-literals
- grouped-accessor-pairs
- no-constructor-return
- no-dupe-else-if
- no-setter-return


- unicorn/consistent-function-scoping (could be painful in test where it's acceptable to disable it)
- unicorn/prefer-reflect-apply (to disable in front)
- unicorn/no-console-spaces
- unicorn/no-for-loop
- unicorn/no-unreadable-array-destructuring
- unicorn/no-unused-properties
- unicorn/no-zero-fractions
- unicorn/prefer-includes
- unicorn/prefer-node-append
- unicorn/prefer-node-remove
- unicorn/prefer-text-content

unicorn/prevent-abbreviations was tried but considered too painful

### Ava
- ava/no-incorrect-deep-equal
- ava/no-inline-assertions
- ava/prefer-t-regex

ava/test-title-format was not activated, as ava/hooks-order

### Mocha
- mocha/no-async-describe

### react
- react/destructuring-assignment
- react/jsx-max-depth
- react/jsx-child-element-spacing
- react/jsx-one-expression-per-line
- react/jsx-props-no-multi-spaces
- react/button-has-type
- react/jsx-sort-default-props
- react/no-this-in-sfc
- react/no-unsafe
- react/jsx-curly-newline (with following config: `{multiline: 'require', singleline: 'forbid'}`)

### flow
Mis en warning le temps de statuer
- flowtype/array-style-complex-type
- flowtype/array-style-simple-type
- flowtype/require-compound-type-alias
- flowtype/no-mixed

## No documentation so far before 9.1
