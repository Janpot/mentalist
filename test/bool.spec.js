/* global describe, it */

'use strict';

const assert = require('chai').assert;
const mentalist = require('..');

describe('.bool', function () {
  it('() should throw', function () {
    assert.throws(function () {
      mentalist.bool();
    });
  });

  it('(undefined, true) should throw', function () {
    assert.throws(function () {
      mentalist.bool(undefined, true);
    });
  });

  it('("UNDEFINED") should throw', function () {
    delete process.env.UNDEFINED;
    assert.throws(function () {
      mentalist.bool('UNDEFINED');
    });
  });

  it('("STRING", true) should throw', function () {
    process.env.STRING = 'hello';
    assert.throws(function () {
      mentalist.bool('STRING', true);
    });
  });

  it('("FALSE") should return false', function () {
    process.env.FALSE = 'false';
    const result = mentalist.bool('FALSE');
    assert.strictEqual(result, false);
  });

  it('("FALSE", true) should return false', function () {
    process.env.FALSE = 'false';
    const result = mentalist.bool('FALSE', true);
    assert.strictEqual(result, false);
  });

  it('("TRUE") should return false', function () {
    process.env.TRUE = 'true';
    const result = mentalist.bool('TRUE');
    assert.strictEqual(result, true);
  });

  it('("UNDEFINED", null) should return null', function () {
    delete process.env.UNDEFINED;
    const result = mentalist.bool('UNDEFINED', null);
    assert.strictEqual(result, null);
  });

  it('("UNDEFINED", false) should return false', function () {
    delete process.env.UNDEFINED;
    const result = mentalist.bool('UNDEFINED', false);
    assert.strictEqual(result, false);
  });

  it('("UNDEFINED", true) should return true', function () {
    delete process.env.UNDEFINED;
    const result = mentalist.bool('UNDEFINED', true);
    assert.strictEqual(result, true);
  });

  it('("UNDEFINED", "true") should return true', function () {
    delete process.env.UNDEFINED;
    const result = mentalist.bool('UNDEFINED', 'true');
    assert.strictEqual(result, true);
  });

  it('("UNDEFINED", "hello") should throw', function () {
    delete process.env.UNDEFINED;
    assert.throws(function () {
      mentalist.bool('UNDEFINED', 'hello');
    });
  });

  it('("UNDEFINED", "TrUe") should return true', function () {
    delete process.env.UNDEFINED;
    const result = mentalist.bool('UNDEFINED', 'TrUe');
    assert.strictEqual(result, true);
  });

  it('("MIXED_CASED_TRUE") should return true', function () {
    process.env.MIXED_CASED_TRUE = 'TrUe';
    const result = mentalist.bool('MIXED_CASED_TRUE');
    assert.strictEqual(result, true);
  });

  it('("MIXED_CASED_FALSE", undefined) should return false', function () {
    process.env.MIXED_CASED_FALSE = 'fAlSe';
    const result = mentalist.bool('MIXED_CASED_FALSE', 'fAlSe');
    assert.strictEqual(result, false);
  });
});
