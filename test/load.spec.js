/* global describe, it, before */

'use strict';

var assert = require('chai').assert;
var mentalist = require('..');
var path = require('path');


describe('.load', function () {

  before(function () {
    process.env.MENTALIST_DIR = path.resolve(__dirname, 'configs');
  });

  it('loads js from a specified dir', function () {
    process.env.NODE_ENV = 'someJsConfig';
    delete process.env.MARKER;
    mentalist.load();
    assert.strictEqual(process.env.MARKER, 'jsConfig');
  });

  it('loads json from a specified dir', function () {
    process.env.NODE_ENV = 'someJsonConfig';
    delete process.env.MARKER;
    mentalist.load();
    assert.strictEqual(process.env.MARKER, 'jsonConfig');
  });

  it('ignores non-existing config files', function () {
    process.env.NODE_ENV = 'nonExisting';
    delete process.env.MARKER;
    assert.doesNotThrow(function () {
      mentalist.load();
    });
    assert.isUndefined(process.env.MARKER);
  });

  it('throws on invalid config file', function () {
    process.env.NODE_ENV = 'someInvalidJson';
    delete process.env.MARKER;
    assert.throws(function () {
      mentalist.load();
    });
  });

  it('loads extra vars when specified', function () {
    process.env.NODE_ENV = 'someJsConfig';
    delete process.env.MARKER;
    mentalist.load({
      OTHER_MARKER: 'inlineConfig'
    });
    assert.strictEqual(process.env.MARKER, 'jsConfig');
    assert.strictEqual(process.env.OTHER_MARKER, 'inlineConfig');
  });

  it('overwrites extra vars when specified', function () {
    process.env.NODE_ENV = 'someJsConfig';
    delete process.env.MARKER;
    mentalist.load({
      MARKER: 'inlineConfig'
    });
    assert.strictEqual(process.env.MARKER, 'inlineConfig');
  });

});