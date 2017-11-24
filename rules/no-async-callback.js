'use strict';

const defaultCallbackNames = ['done', 'cb', 'callback', 'next'];

function create(context) {
  const options = context.options[0] || {};
  const callbackNames = options.callbacks || defaultCallbackNames;
  const checkFunction = node => {
    const callbackParam = node.params.find(
      param => param.type === 'Identifier' && callbackNames.includes(param.name)
    );

    if (callbackParam && node.async) {
      context.report({
        node: callbackParam,
        message: 'Do not use callback parameters inside an async function'
      });
    }
  };

  return {
    ArrowFunctionExpression: checkFunction,
    FunctionDeclaration: checkFunction,
    FunctionExpression: checkFunction
  };
}

const schema = [
  {
    type: 'object',
    properties: {
      callbacks: {
        type: 'array'
      }
    }
  }
];

module.exports = {
  create,
  meta: {
    schema
  }
};
