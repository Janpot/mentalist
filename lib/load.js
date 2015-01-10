'use strict';

var path = require('path');

var DEFAULT_ENV = 'development';


function loadVars(vars) {
  Object.keys(vars)
    .forEach(function (key) {
      process.env[key] = vars[key];
    });
}

function fetchDefaultvars() {
  var defaultMentalistDir = path.resolve(process.cwd(), 'mentalist');
  var mentalistDir = process.env.MENTALIST_DIR || defaultMentalistDir;
  var nodeEnv = process.env.NODE_ENV || DEFAULT_ENV;
  var configPath = path.resolve(mentalistDir, nodeEnv);

  try {
    require.resolve(configPath);
  } catch (e) {
    // doesn't exist
    return null;
  }

  return require(configPath);
}

function load(vars) {
  var defaultVars = fetchDefaultvars();

  if (defaultVars) {
    loadVars(defaultVars);
  }

  if (vars) {
    loadVars(vars);
  }
}

module.exports = load;
