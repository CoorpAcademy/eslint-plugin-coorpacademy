const createFixer = ({range, left, right, operator}, source) => fixer => {
  const {start: leftStart, end: leftEnd} = left;
  const {start: rightStart} = right;
  const operatorRange = [leftEnd, rightStart];
  const operatorText = source.slice(...operatorRange);

  if (operator === '||') {
    const leftText = source.slice(leftStart, leftEnd);
    return [
      fixer.replaceTextRange(operatorRange, operatorText.replace(operator, `? ${leftText} :`))
    ];
  }

  return [
    fixer.replaceTextRange(operatorRange, operatorText.replace(operator, '?')),
    fixer.insertTextAfterRange(range, ' : null')
  ];
};

const create = context => ({
  LogicalExpression: node => {
    if (node.right.type === 'JSXElement') {
      context.report({
        node,
        message: 'JSX should not use logical expression',
        fix: createFixer(node, context.getSourceCode().getText())
      });
    }
  }
});

module.exports = {
  create,
  createFixer,
  meta: {
    docs: {
      description: 'Prevent falsy values to be printed'
    },
    fixable: 'code'
  }
};
