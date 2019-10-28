const dangerousIdentifiers = ['context', 'ctx', 'req', 'process', 'config'];
const loggerFunctions = ['log', 'info', 'warn', 'error'];

function isDangerousProperty(node) {
  return (
    node.property.type === 'Identifier' &&
    (['config'].includes(node.property.name) ||
      (node.property.name === 'env' &&
        node.object.type === 'Identifier' &&
        node.object.name === 'process'))
  );
}

function isDangerousData(node) {
  return (
    (node.type === 'Identifier' && dangerousIdentifiers.includes(node.name)) ||
    (node.type === 'MemberExpression' && isDangerousProperty(node))
  );
}

function isLogCall(node) {
  return (
    (node.type === 'Identifier' && node.name === 'debug') ||
    (node.type === 'MemberExpression' &&
      node.property.type === 'Identifier' &&
      loggerFunctions.includes(node.property.name))
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
