'use strict';

var util = require('util');

/*
Utilities to ease the parsing of environment vars
*/


function parseBool(value) {
  return (function () {
    switch (value.toString().toLowerCase()) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        return undefined;
    }
  }());
}

/**
 * Reads a boolean from an environment variable.
 * Throws on invalid input.
 * 
 * @param  environment variable name
 * @param  default value (optional)
 * @return parsed boolean
 */
exports.bool = function (varName, defaultValue) {
  if (varName === undefined) {
    throw new Error('Invalid argument "varName"');
  }
  
  var envValue = process.env[varName];
  if (envValue === undefined) {
    if (defaultValue === undefined) {
      throw new Error('Default value not defined');
    } else if (defaultValue === null) {
      return null;
    } else {
      var defaultBool = parseBool(defaultValue);
      if (defaultBool === undefined) {
        throw new Error('Invalid argument "defaultValue"');
      }
      return defaultBool;
    }
  }
  
  var boolValue = parseBool(envValue);
  if (boolValue === undefined) {
    throw new Error('Invalid argument "varName"');
  }
  return boolValue;
  
};






function parseNumber(string) {
  if (string === '') {
    return NaN;
  }
  return Number(string);
}

/**
 * Reads a number from an environment variable.
 * Throws on invalid input.
 * 
 * @param  environment variable name
 * @param  default value (optional)
 * @return parsed number
 */
exports.number = function (varName, defaultValue) {
  if (varName === undefined) {
    throw new Error('Invalid argument "varName"');
  }
  
  var envValue = process.env[varName];
  if (envValue === undefined) {
    if (defaultValue === undefined) {
      throw new Error('Default value not defined');
    } else if (defaultValue === null) {
      return null;
    } else {
      var defaultInt = parseNumber(defaultValue);
      if (isNaN(defaultInt)) {
        throw new Error('Invalid argument "defaultValue"');
      }
      return defaultInt;
    }
  }
  
  var intValue = parseNumber(envValue);
  if (isNaN(intValue)) {
    throw new Error('Not an integer');
  }
  
  return intValue;
};




/**
 * Reads a string from an environment variable.
 * Throws on invalid input.
 * 
 * @param  environment variable name
 * @param  default value (optional)
 * @return parsed string
 */
exports.string = function (varName, defaultValue) {
  if (varName === undefined) {
    throw new Error('Invalid argument "varName"');
  }
  
  var envValue = process.env[varName];
  if (envValue === undefined || envValue === '') {
    if (defaultValue === undefined) {
      throw new Error('Default value not defined');
    } else if (defaultValue === null) {
      return null;
    } else {
      return defaultValue.toString();
    }
  }
  
  return envValue.toString();
};




/**
 * Reads an object in json format from an environment variable.
 * Throws on invalid input.
 * 
 * @param  environment variable name
 * @param  default value (optional)
 * @return parsed object, array or null
 */
exports.object = function (varName, defaultValue) {
  if (varName === undefined) {
    throw new Error('Invalid argument "varName"');
  }
  
  var envValue = process.env[varName];
  if (envValue === undefined) {
    if (defaultValue === undefined) {
      throw new Error('Default value not defined');
    } else if (defaultValue === null) {
      return null;
    } else if (typeof defaultValue !== 'object') {
      throw new Error('Default value not an object');
    } else {
      return defaultValue;
    }
  }
  
  var value = JSON.parse(envValue);

  var isObject = value === Object(value);
  if (!isObject || util.isArray(value)) {
    throw new Error('value not an object');
  }

  return value;
};
