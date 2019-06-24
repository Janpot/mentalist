/* global describe, it */

'use strict';

const assert = require('chai').assert;
const mentalist = require('..');

describe('.has', function () {
  it('() should throw', function () {
    assert.throws(function () {
      mentalist.has();
    });
  });

  it('(undefined) should return false', function () {
    assert.throws(function () {
      mentalist.bool(undefined, true);
    });
  });

  it('("UNDEFINED") should return false', function () {
    delete process.env.UNDEFINED;
    assert.strictEqual(mentalist.has('UNDEFINED'), false);
  });

  it('("ZERO") should return true', function () {
    process.env.ZERO = '0';
    const result = mentalist.has('ZERO');
    assert.strictEqual(result, true);
  });

  it('("SOMETHING") should return true', function () {
    process.env.SOMETHING = 'SOMETHING';
    const result = mentalist.has('SOMETHING');
    assert.strictEqual(result, true);
  });
});
