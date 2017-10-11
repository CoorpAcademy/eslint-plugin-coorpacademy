'use strict';

const _ = require('lodash/fp');
const astUtils = require('eslint-ast-utils');

const isExpectCall = node => node.type === 'Identifier' && node.name === 'expect';

const analyze = node => {
  if (node.type === 'MemberExpression') {
    const res = analyze(node.object);
    return {
      root: res.root,
      args: res.args,
      hasMultipleAssertions: res.hasMultipleAssertions,
      properties: res.properties.concat(node.property.name)
    };
  }
  if (node.type === 'CallExpression') {
    if (isExpectCall(node.callee)) {
      return {
        root: node,
        args: node.arguments,
        hasMultipleAssertions: false,
        properties: []
      };
    }
    const res = analyze(node.callee);
    return {
      root: res.root,
      args: res.args,
      hasMultipleAssertions: true,
      properties: res.properties
    };
  }
  return {
    root: node,
    args: [],
    hasMultipleAssertions: false,
    properties: []
  };
};

const flatten = array => array.reduce((a, b) => a.concat(b), []);
const compact = array => array.filter(Boolean);

const addToAndNegation = obj => {
  Object.keys(obj).forEach(key => {
    obj[key].properties = compact(
      flatten(
        obj[key].properties.map(value => [
          compact(['to'].concat(value)),
          !obj[key].disableNot && compact(['to', 'not'].concat(value))
        ])
      )
    );
  });
  return obj;
};

const possibleProperties = addToAndNegation({
  equal: {
    properties: ['', 'deep'],
    minArgs: 1
  },
  a: {
    properties: [['be']],
    minArgs: 1
  },
  above: {
    properties: [['be']],
    minArgs: 1,
    disableNot: true
  },
  an: {
    properties: [['be']],
    minArgs: 1
  },
  below: {
    properties: [['be']],
    minArgs: 1,
    disableNot: true
  },
  callCount: {
    properties: [['have']],
    minArgs: 1
  },
  calledWith: {
    properties: [['have', 'been']],
    minArgs: 1
  },
  closeTo: {
    properties: [['be']],
    minArgs: 1
  },
  contain: {
    properties: [['']],
    minArgs: 1
  },
  gt: {
    properties: [['be']],
    minArgs: 1,
    disableNot: true
  },
  gte: {
    properties: [['be']],
    minArgs: 1,
    disableNot: true
  },
  greaterThan: {
    properties: [['be']],
    minArgs: 1,
    disableNot: true
  },
  include: {
    properties: [['']],
    minArgs: 1
  },
  instanceof: {
    properties: [['be', 'an']],
    minArgs: 1
  },
  keys: {
    properties: [['have', 'all'], ['have', 'any']],
    minArgs: 1
  },
  least: {
    properties: [['be', 'at']],
    minArgs: 1,
    disableNot: true
  },
  lessThan: {
    properties: [['be']],
    minArgs: 1,
    disableNot: true
  },
  lt: {
    properties: [['be']],
    minArgs: 1,
    disableNot: true
  },
  lte: {
    properties: [['be']],
    minArgs: 1,
    disableNot: true
  },
  match: {
    properties: [['']],
    minArgs: 1
  },
  most: {
    properties: [['be', 'at']],
    minArgs: 1,
    disableNot: true
  },
  property: {
    properties: [['have'], ['have', 'nested']],
    minArgs: 1
  },
  oneOf: {
    properties: [['be']],
    minArgs: 1
  },
  satisfy: {
    properties: [['']],
    minArgs: 1
  },
  string: {
    properties: [['have']],
    minArgs: 1
  },
  throw: {
    properties: [['']],
    minArgs: 0
  },
  within: {
    properties: [['be']],
    minArgs: 2
  }
});

const primitives = ['Literal', 'TemplateLiteral'];
const nonPrimitives = ['ArrayExpression', 'ObjectExpression'];

const omitLoc = _.omit(['loc', 'range', 'start', 'end']);
const removeLocation = obj => {
  if (_.isArray(obj)) {
    return _.map(removeLocation, obj);
  }
  if (_.isObject(obj)) {
    return _.mapValues(removeLocation, omitLoc(obj));
  }
  return obj;
};

const toBeA_Check = type => (context, expression, properties, expectedValue) => {
  if (expectedValue.type !== 'Literal') {
    return;
  }

  if (expectedValue.raw !== expectedValue.raw.toLowerCase()) {
    context.report({
      node: expectedValue,
      fix: fixer => fixer.replaceText(expectedValue, expectedValue.raw.toLowerCase()),
      message: 'Expected type should be written in lower case'
    });
  }

  const firstCharsAllowed = type === 'a' ? 'bcdfghjklmnpqrstvwxz' : 'aeiouy';

  if (!firstCharsAllowed.includes(expectedValue.value.toLowerCase()[0])) {
    const nodeToReplace = expression.callee.property;
    context.report({
      node: nodeToReplace,
      fix: fixer => fixer.replaceText(nodeToReplace, type === 'a' ? 'an' : 'a'),
      message:
        type === 'a'
          ? 'Use `an()` rather than `a()` when type starts with a vowel'
          : 'Use `a()` rather than `an()` when type starts with a consonant'
    });
  }
};

const additionalChecks = {
  equal: (context, expression, properties, expectedValue, comparedValue) => {
    if (_.isEqual(removeLocation(expectedValue), removeLocation(comparedValue))) {
      context.report({
        node: expression,
        message: 'Do not compare a value to itself'
      });
      return;
    }
    if (properties.includes('deep') && primitives.includes(expectedValue.type)) {
      const nodeToReplace = expression.callee.object.property;
      context.report({
        node: expression,
        fix: fixer => fixer.removeRange([nodeToReplace.range[0] - 1, nodeToReplace.range[1]]),
        message: 'Remove `.deep` from assertion when comparing to a primitive'
      });
    }
    if (!properties.includes('deep') && nonPrimitives.includes(expectedValue.type)) {
      context.report({
        node: expression,
        fix: fixer => fixer.replaceText(expression.callee.property, 'deep.equal'),
        message: 'Add `.deep` from assertion when comparing to a non-primitive'
      });
    }
  },
  a: toBeA_Check('a'),
  an: toBeA_Check('an')
};

const formatPossibleProperties = obj => {
  return obj.properties.filter(props => !props.includes('not')).map(props => {
    const joined = props.join('.');
    if (obj.disableNot) {
      return joined;
    }
    return joined.replace(/to/g, 'to[.not]');
  });
};

function create(context) {
  return {
    'ExpressionStatement[expression.type="MemberExpression"]': ({expression}) => {
      const {root} = analyze(expression);
      if (root.callee && isExpectCall(root.callee)) {
        context.report({
          node: root,
          message: 'expect() statement should end with a function call'
        });
      }
    },
    'ExpressionStatement[expression.type="CallExpression"]': ({expression}) => {
      if (expression.type === 'CallExpression' && isExpectCall(expression.callee)) {
        context.report({
          node: expression,
          message: 'Missing assertion after `expect()` call'
        });
        return;
      }

      if (
        expression.callee.type !== 'MemberExpression' ||
        expression.callee.property.type !== 'Identifier'
      ) {
        return;
      }

      const {root, args, hasMultipleAssertions, properties} = analyze(expression.callee.object);
      if (!root.callee || !isExpectCall(root.callee)) {
        return;
      }

      if (properties.includes('and')) {
        context.report({
          node: root.callee,
          message: 'Do not chain assertions using `.and.`'
        });
        return;
      }

      if (hasMultipleAssertions) {
        context.report({
          node: root.callee,
          message: 'Do not chain multiple assertions'
        });
        return;
      }

      const methodName = expression.callee.property.name;
      if (possibleProperties[methodName] === undefined) {
        context.report({
          node: expression.callee.property,
          message: `Unknown assertion method ${methodName}`
        });
        return;
      }
      if (possibleProperties[methodName].minArgs > expression.arguments.length) {
        context.report({
          node: expression,
          message: `${methodName}() expects at least ${possibleProperties[methodName]
            .minArgs} argument(s)`
        });
        return;
      }

      if (args.length !== 1) {
        context.report({
          node: root.callee,
          message: 'expect() takes exactly one argument'
        });
        return;
      }

      if (astUtils.computeStaticExpression(args[0]) !== undefined) {
        context.report({
          node: root.callee,
          message: 'Do not evaluate expressions that can be computed statically'
        });
        return;
      }

      const isValid = possibleProperties[methodName].properties.some(props =>
        _.isEqual(props, properties)
      );

      if (!isValid) {
        const formattedPossibleProperties = formatPossibleProperties(
          possibleProperties[methodName]
        );
        const replacement = properties.includes('not')
          ? formattedPossibleProperties[0].replace(/[\]\[]/g, '')
          : formattedPossibleProperties[0].replace(/\[\.not\]/, '');

        const range = [
          root.range[1] + 1,
          _.getOr(root.range[1], 'callee.object.property.range.1', expression)
        ];
        context.report({
          node: root,
          fix: fixer =>
            range[0] < range[1]
              ? fixer.replaceTextRange(range, replacement)
              : fixer.insertTextAfter(root, '.' + replacement),
          message: `\`${methodName}()\` should be prefixed by: ${formattedPossibleProperties.join(
            ' / '
          )}`
        });
        return;
      }

      const check = additionalChecks[methodName] || _.noop;
      check(context, expression, properties, expression.arguments[0], args[0]);
    }
  };
}

module.exports = {
  create,
  meta: {
    fixable: 'code'
  }
};
