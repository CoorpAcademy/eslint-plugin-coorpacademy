# Coorpacademy ESLint plugin

[![npm](https://img.shields.io/npm/v/@coorpacademy/eslint-plugin-coorpacademy.svg?maxAge=2592000)](https://github.com/CoorpAcademy/eslint-plugin-coorpacademy)
[![travis](https://api.travis-ci.org/CoorpAcademy/eslint-plugin-coorpacademy.svg)](https://travis-ci.org/CoorpAcademy/eslint-plugin-coorpacademy)

CoorpAcademy's ESLint rules and configs.

## Installation

```console
npm install --save-dev eslint @coorpacademy/eslint-plugin-coorpacademy
```

## Usage

This package provides multiple configuration for different purposes, that you can apply together in you project as needed. To use them, set the `extends` key of your `.eslintrc` file and add `@coorpacademy/coorpacademy` to your list of plugins.

```json
{
  "extends": [
    "plugin:@coorpacademy/coorpacademy/core",
    "plugin:@coorpacademy/coorpacademy/mocha",
    "plugin:@coorpacademy/coorpacademy/ava",
    "..."
  ],
  "plugins": [
    "@coorpacademy/coorpacademy"
  ]
}
```

Available rule sets are:
- [ava](./config/ava.js): Rules for when using AVA
- [core](./config/core.js): Shared ESLint rules
- [es20XX](./config/es20XX.js): Rules for when using ES2015+ syntax
- [flowtype](./config/flowtype.js): Rules for when using Flowtype
- [lodash-fp](./config/lodash-fp.js): Rules for when using Lodash's FP flavor
- [mocha](./config/mocha.js): Rules for when using Mocha
- [prettier](./config/prettier.js): Disables all stylistic rules but adds source code auto-formatting.
- [react](./config/react.js): Rules for when using React
