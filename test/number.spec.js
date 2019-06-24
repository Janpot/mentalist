/* global describe, it */

'use strict';

const assert = require('chai').assert;
const mentalist = require('..');

describe('.number', function () {
  it('() should throw', function () {
    assert.throws(function () {
      mentalist.number();
    });
  });

  it('(undefined, 1) should throw', function () {
    assert.throws(function () {
      mentalist.number(undefined, 1);
    });
  });

  it('("UNDEFINED") should throw', function () {
    delete process.env.UNDEFINED;
    assert.throws(function () {
      mentalist.number('UNDEFINED');
    });
  });

  it('("STRING", 1) should throw', function () {
    process.env.STRING = 'hello';
    assert.throws(function () {
      mentalist.number('STRING', 1);
    });
  });

  it('("ZERO") should return 0', function () {
    process.env.ZERO = '0';
    const result = mentalist.number('ZERO');
    assert.strictEqual(result, 0);
  });

  it('("ZERO", 1) should return 0', function () {
    process.env.ZERO = '0';
    const result = mentalist.number('ZERO', 1);
    assert.strictEqual(result, 0);
  });

  it('("ONE", undefined) should return 1', function () {
    process.env.ONE = '1';
    const result = mentalist.number('ONE');
    assert.strictEqual(result, 1);
  });

  it('("ONE", 2) should return 1', function () {
    process.env.ONE = '1';
    const result = mentalist.number('ONE', 2);
    assert.strictEqual(result, 1);
  });

  it('("UNDEFINED", null) should return null', function () {
    delete process.env.UNDEFINED;
    const result = mentalist.number('UNDEFINED', null);
    assert.strictEqual(result, null);
  });

  it('("UNDEFINED", 0) should return 0', function () {
    delete process.env.UNDEFINED;
    const result = mentalist.number('UNDEFINED', 0);
    assert.strictEqual(result, 0);
  });

  it('("UNDEFINED", 1) should return 1', function () {
    delete process.env.UNDEFINED;
    const result = mentalist.number('UNDEFINED', 1);
    assert.strictEqual(result, 1);
  });

  it('("UNDEFINED", "1") should return 1', function () {
    delete process.env.UNDEFINED;
    const result = mentalist.number('UNDEFINED', '1');
    assert.strictEqual(result, 1);
  });

  it('("UNDEFINED", "hello") should throw', function () {
    delete process.env.UNDEFINED;
    assert.throws(function () {
      mentalist.number('UNDEFINED', 'hello');
    });
  });

  it('("UNDEFINED", "1hello") should throw', function () {
    delete process.env.UNDEFINED;
    assert.throws(function () {
      mentalist.number('UNDEFINED', '1hello');
    });
  });

  it('("PARSABLE", 1) should throw', function () {
    process.env.PARSABLE = '1hello';
    assert.throws(function () {
      mentalist.number('PARSABLE', 1);
    });
  });

  it('("EMPTY_STRING", 1) should throw', function () {
    process.env.EMPTY_STRING = '';
    assert.throws(function () {
      mentalist.number('EMPTY_STRING', 1);
    });
  });
});
