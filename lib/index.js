const { deprecate } = require('util');

/*
Utilities to ease the parsing of environment vars
*/

function parseBool (value) {
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

function missingVariableError (varName, expectedType) {
  return new Error(`Missing environment variable "${varName}" of type "${expectedType}"`);
}

function wrongTypeError (varName, expectedType, gotValue) {
  return new Error(`Wrong type for environment variable "${varName}", expected "${expectedType}" but got "${gotValue}"`);
}

function wrongDefaultTypeError (varName, expectedType, gotValue) {
  return new Error(`Wrong type for "${varName}"'s default value, expected "${expectedType}" but got "${gotValue}"`);
}

/**
 * Returns whether the given variable exists in the environment.
 *
 * @param {string} environment variable name
 * @returns {boolean}
 */
function has (varName) {
  if (varName === undefined) {
    throw new Error('Invalid argument "varName"');
  }
  return process.env[varName] !== undefined;
}

/**
 * Reads a boolean from an environment variable.
 * Throws on invalid input.
 *
 * @param {string} environment variable name
 * @param {boolean=} default value (optional)
 * @returns {boolean}
 */
function boolean (varName, defaultValue) {
  if (varName === undefined) {
    throw new Error('Invalid argument "varName"');
  }

  const envValue = process.env[varName];
  if (envValue === undefined) {
    if (defaultValue === undefined) {
      throw missingVariableError(varName, 'boolean');
    } else if (defaultValue === null) {
      return null;
    } else {
      const defaultBool = parseBool(defaultValue);
      if (defaultBool === undefined) {
        throw wrongDefaultTypeError(varName, 'boolean', defaultValue);
      }
      return defaultBool;
    }
  }

  const boolValue = parseBool(envValue);
  if (boolValue === undefined) {
    throw wrongTypeError(varName, 'boolean', envValue);
  }
  return boolValue;
}

function parseNumber (string) {
  if (string === '') {
    return NaN;
  }
  return Number(string);
}

/**
 * Reads a number from an environment variable.
 * Throws on invalid input.
 *
 * @param {string} environment variable name
 * @param {numner=} default value (optional)
 * @returns {number}
 */
function number (varName, defaultValue) {
  if (varName === undefined) {
    throw new Error('Invalid argument "varName"');
  }

  const envValue = process.env[varName];
  if (envValue === undefined) {
    if (defaultValue === undefined) {
      throw missingVariableError(varName, 'number');
    } else if (defaultValue === null) {
      return null;
    } else {
      const defaultInt = parseNumber(defaultValue);
      if (isNaN(defaultInt)) {
        throw wrongDefaultTypeError(varName, 'number', defaultValue);
      }
      return defaultInt;
    }
  }

  const intValue = parseNumber(envValue);
  if (isNaN(intValue)) {
    throw wrongTypeError(varName, 'number', envValue);
  }

  return intValue;
}

/**
 * Reads a string from an environment variable.
 * Throws on invalid input.
 *
 * @param {string} environment variable name
 * @param {string=} default value (optional)
 * @returns {string}
 */
function string (varName, defaultValue) {
  if (varName === undefined) {
    throw new Error('Invalid argument "varName"');
  }

  const envValue = process.env[varName];
  if (envValue === undefined || envValue === '') {
    if (defaultValue === undefined) {
      throw missingVariableError(varName, 'string');
    } else if (defaultValue === null) {
      return null;
    } else {
      return defaultValue.toString();
    }
  }

  return envValue.toString();
}

/**
 * Reads an object in json format from an environment variable.
 * Throws on invalid input.
 *
 * @param {string} environment variable name
 * @param {any} default value (optional)
 * @returns {any}
 */
function object (varName, defaultValue) {
  if (varName === undefined) {
    throw new Error('Invalid argument "varName"');
  }

  const envValue = process.env[varName];
  if (envValue === undefined) {
    if (defaultValue === undefined) {
      throw missingVariableError(varName, 'object');
    } else if (defaultValue === null) {
      return null;
    } else if (typeof defaultValue !== 'object') {
      throw wrongDefaultTypeError(varName, 'object', defaultValue);
    } else {
      return defaultValue;
    }
  }

  const value = JSON.parse(envValue);

  const isObject = value === Object(value);
  if (!isObject || Array.isArray(value)) {
    throw wrongTypeError(varName, 'object', envValue);
  }

  return value;
}

module.exports = {
  has,
  boolean,
  bool: deprecate(boolean, 'mentalist.bool() is deprecated, use mentalist.boolean() instead'),
  string,
  number,
  object
};
