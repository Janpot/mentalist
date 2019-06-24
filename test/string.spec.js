/* global describe, it */

'use strict';

const assert = require('chai').assert;
const mentalist = require('..');

describe('.string', function () {
  it('() should throw', function () {
    assert.throws(function () {
      mentalist.string();
    });
  });

  it('(undefined, "string") should throw', function () {
    assert.throws(function () {
      mentalist.string(undefined, 'string');
    });
  });

  it('("UNDEFINED") should throw', function () {
    delete process.env.UNDEFINED;
    assert.throws(function () {
      mentalist.string('UNDEFINED');
    });
  });

  it('("STRING") should return "string"', function () {
    process.env.STRING = 'string';
    const result = mentalist.string('STRING');
    assert.strictEqual(result, 'string');
  });

  it('("STRING", "another string") should return "string"', function () {
    process.env.STRING = 'string';
    const result = mentalist.string('STRING', 'another string');
    assert.strictEqual(result, 'string');
  });

  it('("EMPTY_STRING", "string") should return "string"', function () {
    process.env.EMPTY_STRING = '';
    const result = mentalist.string('EMPTY_STRING', 'string');
    assert.strictEqual(result, 'string');
  });

  it('("UNDEFINED", null) should return null', function () {
    process.env.EMPTY_STRING = '';
    const result = mentalist.string('EMPTY_STRING', null);
    assert.strictEqual(result, null);
  });

  it('("UNDEFINED", 0) should return "0"', function () {
    delete process.env.UNDEFINED;
    const result = mentalist.string('UNDEFINED', 0);
    assert.strictEqual(result, '0');
  });

  it('("UNDEFINED", 999) should return "999"', function () {
    delete process.env.UNDEFINED;
    const result = mentalist.string('UNDEFINED', 999);
    assert.strictEqual(result, '999');
  });

  it('("EMPTY_STRING") should throw', function () {
    process.env.EMPTY_STRING = '';
    assert.throws(function () {
      mentalist.string('EMPTY_STRING');
    });
  });
});
