'use strict';

const _ = require('lodash/fp');

const makeReport = (context, propertiesFieldKey, regularProperty, spreadProperty) => node => {
  const firstIndexOfProperty = _.findIndex({type: regularProperty}, node[propertiesFieldKey]);
  const lastIndexOfSpreadProperty = _.findLastIndex(
    {type: spreadProperty},
    node[propertiesFieldKey]
  );

  if (
    firstIndexOfProperty !== -1 &&
    lastIndexOfSpreadProperty !== -1 &&
    firstIndexOfProperty < lastIndexOfSpreadProperty
  ) {
    context.report({
      node,
      message: 'Set individual properties after the spread properties'
    });
  }
};

function create(context) {
  return {
    JSXOpeningElement: makeReport(context, 'attributes', 'JSXAttribute', 'JSXSpreadAttribute'),
    ObjectExpression: makeReport(context, 'properties', 'Property', 'ExperimentalSpreadProperty')
  };
}

module.exports = {
  create,
  meta: {}
};
