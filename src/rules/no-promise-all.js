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
          message: 'Prefer Promise.allSettled or pSettle like logic instead of Promise.all'
        });
    }
  };
}

module.exports = {
  create,
  meta: {
    description: 'Prevent use of Promise.all for promise resolution'
  }
};
