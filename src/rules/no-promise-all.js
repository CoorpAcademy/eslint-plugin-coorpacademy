function isPromiseAll(node) {
  return (
    node.type === 'MemberExpression' &&
    node.object.type === 'Identifier' &&
    node.object.name === 'Promise' &&
    node.property.type === 'Identifier' &&
    node.property.name === 'all'
  );
}

function create(context) {
  return {
    CallExpression: node => {
      if (isPromiseAll(node.callee))
        context.report({
          node,
          message: 'Use sequence or traverse instead of promise all'
        });
    }
  };
}

module.exports = {
  create,
  meta: {}
};
