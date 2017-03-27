'use strict';

const dangerousIdentifiers = ['context', 'ctx', 'req', 'process', 'config'];
const loggerFunctions = ['log', 'info', 'warn', 'error'];

function isDangerousProperty(node) {
  return node.property.type === 'Identifier' &&
    ( ['config'].indexOf(node.property.name) >= 0 ||
      ( node.property.name === 'env' &&
        node.object.type === 'Identifier' &&
        node.object.name === 'process'
      )
    );
}

function isDangerousData(node) {
  return (node.type === 'Identifier' && dangerousIdentifiers.indexOf(node.name) >= 0) ||
    ( node.type === 'MemberExpression' && isDangerousProperty(node));
}

function isLogCall(node) {
  return (node.type === 'Identifier' && node.name === 'debug') ||
    ( node.type === 'MemberExpression' &&
      node.property.type === 'Identifier' &&
      loggerFunctions.indexOf(node.property.name) >= 0
    );
}

function create(context) {
  return {
    CallExpression: node => {
      if (isLogCall(node.callee) && node.arguments.some(isDangerousData)) {
        context.report({
          node,
          message: 'This logging statement may leak sensitive information'
        });
      }
    }
  };
}

module.exports = {
  create,
  meta: {}
};
