# Changelog

Here is list of rules modifications. (starting from v9)

## 10

### Changes
- Drop node v8 support, 10.20.0 being the minimal node version required.
- Eslint v7 minimum.
- Adopt prettier major
- Upgrade all plugins

### Details
#### Eslint v7
Main enhancements of the new major:
- comment ('description') in directive introduced
- no need to specify extension for files specified in overrides pattern
- better plugin discovery (now detect one relatives to config files)

More details [in blog post announcing the release, here](https://eslint.org/blog/2020/05/eslint-v7.0.0-released)

New core eslint rules:
- default-case-last
- no-useless-backreference'

#### Prettier v2
Some fundamental changed were introduced is was not possible for all of them to be opted out when we wanted.
- Mandatory parenthesis for arrow functions, and trailing commas were disabled
- Space between function name and parenthesis is now forced. (unfortunately non configurable)

More details for prettier v2 breaking changes [here](https://prettier.io/blog/2020/03/21/2.0.0.html)

#### Node
##### Migrated rules (most were not activated):
- no-buffer-constructor -> no-deprecated-api
- no-process-env
- no-new-require
- no-path-concat
- no-sync
- global-require
- no-process-exit
- handle-callback-err
- no-restricted-modules
- callback-return

Deprecated eslint core rules have been turned of and flagged to be removed when dropped.
Their current config was port to the node plugin counterpart.

##### New rules
- node/exports-style (`module.exports`)
- node/file-extension-in-import: (`"always", {".js": "never", ".ts": "never"}]`)
- node/no-callback-literal
- node/no-exports-assign
- node/no-extraneous-import
- node/no-extraneous-require
- node/no-missing-import (_migth be redundant with the import plugin)
- node/no-missing-require
- node/no-unsupported-features/es-builtins (relies in node range specified in `package.json#engines`)
- node/no-unsupported-features/es-syntax
- node/no-unsupported-features/node-builtins
- node/process-exit-as-throw (better code path analysis)
- node/prefer-global/buffer
- node/prefer-global/console
- node/prefer-global/process
- node/prefer-global/text-decoder
- node/prefer-global/text-encoder
- node/prefer-global/url
- node/prefer-global/url-search-arams

#### ava
Introduced:
- ava/use-t-throws-async-well
#### core
Introduced
- unicorn/prefer-number-properties, should be opt out when es5 still used.

unicorn had introduced many new rules in latest majors, but they are neither not interesting, not desired or too dangerous due to autofix.

## 9.3
### React
Introduced:
- react/jsx-no-script-url
### Mocha
Introduced
- chai-expect/no-inner-literal

## 9.2

Introduced custom coorpacademy/jsx-no-logical-expression in the react scope

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
