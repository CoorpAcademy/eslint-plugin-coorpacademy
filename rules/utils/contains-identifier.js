'use strict';

function containsIdentifier(name, node) { // eslint-disable-line complexity
  if (!node) {
    return false;
  }
  switch (node.type) {
    case 'Identifier':
    case 'JSXIdentifier':
      return node.name === name;
    case 'MemberExpression': {
      if (node.computed === false) {
        return containsIdentifier(name, node.object);
      }
      return containsIdentifier(name, node.property) ||
        containsIdentifier(name, node.object);
    }
    case 'ExpressionStatement':
    case 'JSXExpressionContainer':
      return containsIdentifier(name, node.expression);
    case 'ConditionalExpression':
    case 'IfStatement':
      return containsIdentifier(name, node.test) ||
        containsIdentifier(name, node.consequent) ||
        containsIdentifier(name, node.alternate);
    case 'BinaryExpression':
    case 'LogicalExpression':
    case 'AssignmentExpression':
      return containsIdentifier(name, node.left) ||
        containsIdentifier(name, node.right);
    case 'ForInStatement':
    case 'ForOfStatement':
      return containsIdentifier(name, node.left) ||
        containsIdentifier(name, node.right) ||
        containsIdentifier(name, node.body);
    case 'ForStatement':
      return containsIdentifier(name, node.init) ||
        containsIdentifier(name, node.test) ||
        containsIdentifier(name, node.update) ||
        containsIdentifier(name, node.body);
    case 'ReturnStatement':
    case 'UnaryExpression':
    case 'UpdateExpression':
    case 'JSXSpreadAttribute':
      return containsIdentifier(name, node.argument);
    case 'Property':
      return containsIdentifier(name, node.value);
    case 'VariableDeclarator':
      return containsIdentifier(name, node.init);
    case 'ArrowFunctionExpression':
    case 'FunctionExpression':
      if (someContainsIdentifier(name, node.params)) {
        return false;
      }
      return containsIdentifier(name, node.body);
    case 'ArrayExpression':
      return someContainsIdentifier(name, node.elements);
    case 'ObjectExpression':
      return someContainsIdentifier(name, node.properties);
    case 'BlockStatement':
      return someContainsIdentifier(name, node.body);
    case 'VariableDeclaration':
      return someContainsIdentifier(name, node.declarations);
    case 'TemplateLiteral':
      return someContainsIdentifier(name, node.expressions);
    case 'CallExpression':
      return containsIdentifier(name, node.callee) ||
        someContainsIdentifier(name, node.arguments);
    case 'JSXElement':
      return containsIdentifier(name, node.openingElement) ||
        someContainsIdentifier(name, node.children);
    case 'JSXOpeningElement':
      return containsIdentifier(name, node.name) ||
        someContainsIdentifier(name, node.attributes);
    default:
      return false;
  }
}

function someContainsIdentifier(name, array) {
  return array.some(function (item) {
    return containsIdentifier(name, item);
  });
}

module.exports = {
  containsIdentifier,
  someContainsIdentifier
};
