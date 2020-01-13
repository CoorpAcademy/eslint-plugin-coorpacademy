function create(context) {
  return {
    LogicalExpression: node => {
      if (node.right.type === 'JSXElement') {
        context.report({
          node,
          message: 'JSX should not use logical expression'
        });
      }
    }
  };
}

module.exports = {
  create,
  meta: {}
};
