/* global describe, it */

'use strict';

const assert = require('chai').assert;
const mentalist = require('..');

describe('.object', function () {
  it('() should throw', function () {
    assert.throws(function () {
      mentalist.object();
    });
  });

  it('(undefined, {other: "object"}) should throw', function () {
    assert.throws(function () {
      mentalist.object(undefined, { other: 'object' });
    });
  });

  it('("UNDEFINED") should throw', function () {
    delete process.env.UNDEFINED;
    assert.throws(function () {
      mentalist.object('UNDEFINED');
    }, 'Missing environment variable "UNDEFINED" of type "object"');
  });

  it('("OBJECT") should return { some: "object" }', function () {
    process.env.OBJECT = '{"some": "object"}';
    const result = mentalist.object('OBJECT');
    assert.deepEqual(result, { some: 'object' });
  });

  it('("NULL") should throw', function () {
    process.env.NULL = 'null';
    assert.throws(function () {
      mentalist.object('NULL');
    }, 'Wrong type for environment variable "NULL", expected "object" but got "null"');
  });

  it('("ARRAY") should throw', function () {
    process.env.ARRAY = '["some", "array"]';
    assert.throws(function () {
      mentalist.object('ARRAY');
    }, 'Wrong type for environment variable "ARRAY", expected "object" but got "["some", "array"]"');
  });

  it('("OBJECT", {other: "object"}) should return { some: "object" }', function () {
    process.env.OBJECT = '{"some": "object"}';
    const result = mentalist.object('OBJECT', { other: 'object' });
    assert.deepEqual(result, { some: 'object' });
  });

  it('("EMPTY_ARRAY", {other: "object"}) should throw', function () {
    process.env.EMPTY_ARRAY = '[]';
    assert.throws(function () {
      mentalist.object('EMPTY_ARRAY', { other: 'object' });
    }, 'Wrong type for environment variable "EMPTY_ARRAY", expected "object" but got "[]"');
  });

  it('("UNDEFINED", null) should return null', function () {
    delete process.env.UNDEFINED;
    const result = mentalist.object('UNDEFINED', null);
    assert.strictEqual(result, null);
  });

  it('("UNDEFINED", {other: "object"}) should return {other: "object"}', function () {
    delete process.env.UNDEFINED;
    const result = mentalist.object('UNDEFINED', { other: 'object' });
    assert.deepEqual(result, { other: 'object' });
  });

  it('("UNDEFINED", 1) should throw', function () {
    delete process.env.UNDEFINED;
    assert.throws(function () {
      mentalist.object('UNDEFINED', 1);
    });
  });

  it('("UNDEFINED", "string") should throw', function () {
    delete process.env.UNDEFINED;
    assert.throws(function () {
      mentalist.object('UNDEFINED', 'string');
    });
  });
});
