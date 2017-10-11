import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/use-expect';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  }
});

const error = message => ({
  ruleId: 'use-expect',
  message
});

const noCall = error('expect() statement should end with a function call');
const unknownMethod = method => error(`Unknown assertion method ${method}`);
const missingAssertion = error('Missing assertion after `expect()` call');
const singleArgumentToExpect = error('expect() takes exactly one argument');
const noAndAssertion = error('Do not chain assertions using `.and.`');
const noMultipleAssertion = error('Do not chain multiple assertions');
const primitiveEvaluation = error('Do not evaluate expressions that can be computed statically');

ruleTester.run('use-expect', rule, {
  valid: [
    'expect(a).to.equal(b)',
    'expect(a).to.not.equal(b)',
    'expect(a).to.deep.equal(b)',
    'expect(a).to.not.deep.equal(b)',
    'expect(a).to.be.a("function")',
    'expect(a).to.not.be.a("function")',
    'expect(a).to.be.an("object")',
    'expect(a).to.not.be.an("object")',
    'expect(a).to.be.a(b)',
    'expect(a).to.not.be.a(b)',
    'expect(a).to.be.an(b)',
    'expect(a).to.not.be.an(b)',
    'expect(a).to.include("foo")',
    'expect(a).to.not.include("foo")',
    'expect(a).to.contain("foo")',
    'expect(a).to.not.contain("foo")',
    'expect(a).to.be.above(0)',
    'expect(a).to.be.gt(0)',
    'expect(a).to.be.gte(0)',
    'expect(a).to.be.greaterThan(0)',
    'expect(a).to.be.below(0)',
    'expect(a).to.be.lessThan(0)',
    'expect(a).to.be.lt(0)',
    'expect(a).to.be.lte(0)',
    'expect(a).to.be.within(0, 100)',
    'expect(a).to.not.be.within(0, 100)',
    'expect(a).to.be.at.least(0)',
    'expect(a).to.be.at.most(0)',
    'expect(a).to.be.an.instanceof(0)',
    'expect(a).to.not.be.an.instanceof(0)',
    'expect(a).to.have.lengthOf(1)',
    'expect(a).to.not.have.lengthOf(1)',
    'expect(a).to.match(/ok/)',
    'expect(a).to.not.match(/ok/)',
    'expect(a).to.throw()',
    'expect(a).to.not.throw()',
    'expect(a).to.throw(Error)',
    'expect(a).to.not.throw(Error)',
    'expect(a).to.satisfy(function(b) {return b > 2;})',
    'expect(a).to.not.satisfy(function(b) {return b > 2;})',
    'expect(a).to.be.closeTo(1.5, 1)',
    'expect(a).to.not.be.closeTo(1.5, 1)',
    'expect(a).to.be.oneOf([1, 2, 3])',
    'expect(a).to.not.be.oneOf([1, 2, 3])',
    'expect(a).to.have.members([1, 2, 3])',
    'expect(a).to.not.have.members([1, 2, 3])',
    'expect(a).to.have.ordered.members([1, 2, 3])',
    'expect(a).to.not.have.ordered.members([1, 2, 3])',
    'expect(a).to.include.members([1, 2, 3])',
    'expect(a).to.not.include.members([1, 2, 3])',
    'expect(a).to.have.property("foo")',
    'expect(a).to.not.have.property("foo")',
    'expect(a).to.have.all.keys("foo")',
    'expect(a).to.not.have.all.keys("foo")',
    'expect(a).to.have.any.keys("foo")',
    'expect(a).to.not.have.any.keys("foo")',
    'expect(a).to.have.callCount(1)',
    'expect(a).to.not.have.callCount(1)',
    'expect(a).to.have.been.calledWith("foo")',
    'expect(a).to.not.have.been.calledWith("foo")',
    'expect(a).to.have.been.calledWithMatch("foo")',
    'expect(a).to.not.have.been.calledWithMatch("foo")',
    'expect(a).to.equal("foo")',
    'expect(a).to.equal(`1`)',
    'expect(a).to.equal(1)',
    'expect(a).to.deep.equal([])',
    'expect(a).to.deep.equal({})',
    'foo(a).to.be.a("function")',
    'foo(a).to.bar.equal(b)',
    'foo(a)',
    'foo.a',
    'foo.a.b'
  ],
  invalid: [
    {
      code: 'expect(a).to.be.undefined;',
      output: 'expect(a).to.be.undefined;',
      errors: [noCall]
    },
    {
      code: 'expect(a).undefined;',
      output: 'expect(a).undefined;',
      errors: [noCall]
    },
    {
      code: 'expect(a).be.oijfmozqijefqmzej',
      output: 'expect(a).be.oijfmozqijefqmzej',
      errors: [noCall]
    },
    {
      code: 'expect(a).to.foobar(b)',
      output: 'expect(a).to.foobar(b)',
      errors: [unknownMethod('foobar')]
    },
    {
      code: 'expect(a).to.woohoo(b)',
      output: 'expect(a).to.woohoo(b)',
      errors: [unknownMethod('woohoo')]
    },
    {
      code: 'expect(a).to.be.equal(b)',
      output: 'expect(a).to.equal(b)',
      errors: [error('`equal()` should be prefixed by: to[.not] / to[.not].deep')]
    },
    {
      code: 'expect(a).equal(b)',
      output: 'expect(a).to.equal(b)',
      errors: [error('`equal()` should be prefixed by: to[.not] / to[.not].deep')]
    },
    {
      code: 'expect(a).not.to.equal(b)',
      output: 'expect(a).to.not.equal(b)',
      errors: [error('`equal()` should be prefixed by: to[.not] / to[.not].deep')]
    },
    {
      code: 'expect(a).to.a(b)',
      output: 'expect(a).to.be.a(b)',
      errors: [error('`a()` should be prefixed by: to[.not].be')]
    },
    {
      code: 'expect(a).to.an(b)',
      output: 'expect(a).to.be.an(b)',
      errors: [error('`an()` should be prefixed by: to[.not].be')]
    },
    {
      code: 'expect(a).to.be.include(b)',
      output: 'expect(a).to.include(b)',
      errors: [error('`include()` should be prefixed by: to[.not]')]
    },
    {
      code: 'expect(a).be.equal(b)',
      output: 'expect(a).to.equal(b)',
      errors: [error('`equal()` should be prefixed by: to[.not] / to[.not].deep')]
    },
    {
      code: 'expect(a).to.not.be.gt(0)',
      output: 'expect(a).to.be.gt(0)',
      errors: [error('`gt()` should be prefixed by: to.be')]
    },
    {
      code: 'expect(a).to.not.be.gte(0)',
      output: 'expect(a).to.be.gte(0)',
      errors: [error('`gte()` should be prefixed by: to.be')]
    },
    {
      code: 'expect(a).to.not.be.greaterThan(0)',
      output: 'expect(a).to.be.greaterThan(0)',
      errors: [error('`greaterThan()` should be prefixed by: to.be')]
    },
    {
      code: 'expect(a).to.not.be.below(0)',
      output: 'expect(a).to.be.below(0)',
      errors: [error('`below()` should be prefixed by: to.be')]
    },
    {
      code: 'expect(a).to.not.be.lessThan(0)',
      output: 'expect(a).to.be.lessThan(0)',
      errors: [error('`lessThan()` should be prefixed by: to.be')]
    },
    {
      code: 'expect(a).to.not.be.lt(0)',
      output: 'expect(a).to.be.lt(0)',
      errors: [error('`lt()` should be prefixed by: to.be')]
    },
    {
      code: 'expect(a).to.not.be.lte(0)',
      output: 'expect(a).to.be.lte(0)',
      errors: [error('`lte()` should be prefixed by: to.be')]
    },
    {
      code: 'expect(a).to.not.be.at.least(0)',
      output: 'expect(a).to.be.at.least(0)',
      errors: [error('`least()` should be prefixed by: to.be.at')]
    },
    {
      code: 'expect(a).to.not.be.at.most(0)',
      output: 'expect(a).to.be.at.most(0)',
      errors: [error('`most()` should be prefixed by: to.be.at')]
    },
    {
      code: 'expect(a)',
      output: 'expect(a)',
      errors: [missingAssertion]
    },
    {
      code: 'expect(a).to.be.an("array").and.to.deep.equal([1]);',
      output: 'expect(a).to.be.an("array").and.to.deep.equal([1]);',
      errors: [noAndAssertion]
    },
    {
      code: 'expect(a).to.be.undefined.and.not.to.deep.equal([1]);',
      output: 'expect(a).to.be.undefined.and.not.to.deep.equal([1]);',
      errors: [noAndAssertion]
    },
    {
      code: 'expect(foo).to.have.property("bar").to.be.an("object");',
      output: 'expect(foo).to.have.property("bar").to.be.an("object");',
      errors: [noMultipleAssertion]
    },
    {
      code: 'expect(a).to.deep.equal("string")',
      output: 'expect(a).to.equal("string")',
      errors: [error('Remove `.deep` from assertion when comparing to a primitive')]
    },
    {
      code: 'expect(a).to.deep.equal(`1`)',
      output: 'expect(a).to.equal(`1`)',
      errors: [error('Remove `.deep` from assertion when comparing to a primitive')]
    },
    {
      code: 'expect(a).to.deep.equal(1)',
      output: 'expect(a).to.equal(1)',
      errors: [error('Remove `.deep` from assertion when comparing to a primitive')]
    },
    {
      code: 'expect(a).to.equal([])',
      output: 'expect(a).to.deep.equal([])',
      errors: [error('Add `.deep` from assertion when comparing to a non-primitive')]
    },
    {
      code: 'expect(a).to.equal({})',
      output: 'expect(a).to.deep.equal({})',
      errors: [error('Add `.deep` from assertion when comparing to a non-primitive')]
    },
    {
      code: 'expect().to.equal(1)',
      output: 'expect().to.equal(1)',
      errors: [singleArgumentToExpect]
    },
    {
      code: 'expect(a, b).to.equal(1)',
      output: 'expect(a, b).to.equal(1)',
      errors: [singleArgumentToExpect]
    },
    {
      code: 'expect(1).to.equal(a)',
      output: 'expect(1).to.equal(a)',
      errors: [primitiveEvaluation]
    },
    {
      code: 'expect("foo").to.equal(a)',
      output: 'expect("foo").to.equal(a)',
      errors: [primitiveEvaluation]
    },
    {
      code: 'expect(`foo`).to.equal(a)',
      output: 'expect(`foo`).to.equal(a)',
      errors: [primitiveEvaluation]
    },
    {
      code: 'expect(`foo` + "bar").to.equal(a)',
      output: 'expect(`foo` + "bar").to.equal(a)',
      errors: [primitiveEvaluation]
    },
    {
      code: 'expect(1 + 1).to.equal(a)',
      output: 'expect(1 + 1).to.equal(a)',
      errors: [primitiveEvaluation]
    },
    {
      code: 'expect(a).to.equal()',
      output: 'expect(a).to.equal()',
      errors: [error('equal() expects at least 1 argument(s)')]
    },
    {
      code: 'expect(a).to.be.within(1)',
      output: 'expect(a).to.be.within(1)',
      errors: [error('within() expects at least 2 argument(s)')]
    },
    {
      code: 'expect(a).to.equal(a)',
      output: 'expect(a).to.equal(a)',
      errors: [error('Do not compare a value to itself')]
    },
    {
      code: 'expect(a).to.be.a("Function")',
      output: 'expect(a).to.be.a("function")',
      errors: [error('Expected type should be written in lower case')]
    },
    {
      code: 'expect(a).to.be.a("FUNCTION")',
      output: 'expect(a).to.be.a("function")',
      errors: [error('Expected type should be written in lower case')]
    },
    {
      code: 'expect(a).to.be.an("Object")',
      output: 'expect(a).to.be.an("object")',
      errors: [error('Expected type should be written in lower case')]
    },
    {
      code: 'expect(a).to.be.an("OBJECT")',
      output: 'expect(a).to.be.an("object")',
      errors: [error('Expected type should be written in lower case')]
    },
    {
      code: 'expect(a).to.be.a("object")',
      output: 'expect(a).to.be.an("object")',
      errors: [error('Use `an()` rather than `a()` when type starts with a vowel')]
    },
    {
      code: 'expect(a).to.be.an("function")',
      output: 'expect(a).to.be.a("function")',
      errors: [error('Use `a()` rather than `an()` when type starts with a consonant')]
    },
    {
      code: 'expect(a).to.be.an("FUNCTION")',
      output: 'expect(a).to.be.a("function")',
      errors: [
        error('Use `a()` rather than `an()` when type starts with a consonant'),
        error('Expected type should be written in lower case')
      ]
    }
  ]
});
