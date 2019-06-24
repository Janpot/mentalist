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
function bool (varName, defaultValue) {
  if (varName === undefined) {
    throw new Error('Invalid argument "varName"');
  }

  const envValue = process.env[varName];
  if (envValue === undefined) {
    if (defaultValue === undefined) {
      throw new Error('Default value not defined');
    } else if (defaultValue === null) {
      return null;
    } else {
      const defaultBool = parseBool(defaultValue);
      if (defaultBool === undefined) {
        throw new Error('Invalid argument "defaultValue"');
      }
      return defaultBool;
    }
  }

  const boolValue = parseBool(envValue);
  if (boolValue === undefined) {
    throw new Error('Invalid argument "varName"');
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
      throw new Error('Default value not defined');
    } else if (defaultValue === null) {
      return null;
    } else {
      const defaultInt = parseNumber(defaultValue);
      if (isNaN(defaultInt)) {
        throw new Error('Invalid argument "defaultValue"');
      }
      return defaultInt;
    }
  }

  const intValue = parseNumber(envValue);
  if (isNaN(intValue)) {
    throw new Error('Not an integer');
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
      throw new Error('Default value not defined');
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
      throw new Error('Default value not defined');
    } else if (defaultValue === null) {
      return null;
    } else if (typeof defaultValue !== 'object') {
      throw new Error('Default value not an object');
    } else {
      return defaultValue;
    }
  }

  const value = JSON.parse(envValue);

  const isObject = value === Object(value);
  if (!isObject || Array.isArray(value)) {
    throw new Error('value not an object');
  }

  return value;
}

module.exports = {
  has,
  bool,
  string,
  number,
  object
};
