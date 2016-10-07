'use strict';

const {readFileSync} = require('fs');
const {resolve, dirname} = require('path');
const postcss = require('postcss');
const Parser = require('postcss-modules-parser');

function isStaticRequire(node) {
  return node &&
    node.callee &&
    node.callee.type === 'Identifier' &&
    node.callee.name === 'require' &&
    node.arguments.length === 1 &&
    node.arguments[0].type === 'Literal' &&
    typeof node.arguments[0].value === 'string'
}
const instance = postcss([new Parser({fetch})]);

function fetch(_to, from) {
  const to = _to.replace(/^["']|["']$/g, '');
  const filename = /\w/i.test(to[0])
    ? require.resolve(to)
    : resolve(dirname(from), to);

  const css = readFileSync(filename, 'utf8');
  console.log(css);
  return instance.process(css, {from: filename}).root.tokens;
}

const styles = {};

function create(context) {
  return {
    VariableDeclarator(node) {
      if (!node.init || !isStaticRequire(node.init)) {
        return;
      }
      const filename = node.init.arguments[0].value;
      styles[node.id.name] = fetch(filename, context.getFilename());
    },
    MemberExpression(node) {
      if (node.object.type === 'Identifier' && styles[node.object.name]) {
        const style = styles[node.object.name];
        if (node.property.type === 'Identifier' && !style[node.property.name]) {
          context.report({
            node,
            message: `${node.object.name}.${node.property.name} does not exist`
          })
        }
      }
    }
  };
}

module.exports = {
  create,
  meta: {
    docs: {
      description: 'CSS modules'
    }
  }
};
