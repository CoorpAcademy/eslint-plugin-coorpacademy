# Coorpacademy ESLint plugin

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
- [core](./config/core.js): Shared ESLint rules
- [ava](./config/ava.js): Rules for when using AVA
- [es20XX](./config/es20XX.js): Rules for when using ES2015+ syntax
- [jsx](./config/jsx.js): Rules for when using JSX
- [mocha](./config/mocha.js): Rules for when using Mocha
