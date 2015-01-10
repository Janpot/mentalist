mentalist
=========

Environment variable management for configuring applications.

[![Build Status](https://travis-ci.org/Janpot/mentalist.svg)](https://travis-ci.org/Janpot/mentalist)

## installation

    $ npm i mentalist

## introduction

This module is intended to be used to load a configuration when you store parameters in environment variables.
It consists of a set of helper methods that let you easily set up a central configuration module for your application.

Several parse methods are provided to read, parse and default a configuration value.
All parsing methods will throw when a variable is not defined and no default is specified.
The reason for this is to crash the application early on startup when it's misconfigured.
Don't like this behavior? Always specify a default value, use `undefined` for default in case you want it to be optional.

For simulating an environment in a development setup, or in case you want to load configuration from disk,
a `load` function is included. It will look for a js/json file under a `./mentalist` folder in your current working directory.
The object returned by this file wil be used to write the environment variables. Call this `load` function at the start of your program.

## Setup

Given the following file structure:

```text
.
├── lib
│   ├── config.js
│   ├── server.js
│   └── ...
├── mentalist
│   └── development.js
└── package.json
```

We add a configuration file that loads the mentalist library, initializes it and exports al desired configuration.
Note that the `mentalist.load();` is optional if you don't use environment specific configuration files.

```js
// lib/config.js
var mentalist = require('mentalist');
mentalist.load();

exports.port     = mentalist.number('APP_PORT', 80);
exports.loglevel = mentalist.string('LOGLEVEL', 'info');
exports.debug    = mentalist.bool('DEBUG', false);
exports.required = mentalist.string('REQUIRED');
```

We add a development configuration file that initializes the environment variables we want during development.
In this case we set debug mode on with a higher log level.
Note that we added the `REQUIRED` variable, since it has no default value in the configuration file it would throw an exception when undefined.

```js
// mentalist/development.js
exports.LOGLEVEL = 'trace';
exports.DEBUG    = true;
exports.REQUIRED = 'some value';
```

We can now use our configuration module in the rest of our application.

```js
// lib/server.js
var config = require('./config');

if (config.debug) {
  console.log('Log level is at "%s".', config.loglevel);
}
```

## API

```js
var mentalist = require('mentalist');
```

### Loading

```js
mentalist.load([overwrites]);
```

Reads the specified configuration file and adds its content to the environment variables.
The location of these files is by default a `mentalist` folder in the current working directory.
This location can be overwritten by specifying a variable `MENTALIST_DIR` with the absolute path to the desired folder.

The file that will be used has the same name as the current `NODE_ENV` (default: `development`).
You can either use javascript or json files that return an object of which the keys are the variable name and the values the desired variable value.

If you want you can also call this function with a parameter which is an object that contains variables that need to be added to the environment.

### Booleans

```js
var myBool = mentalist.bool(variableName, [default]);
```

Reads in and parses a boolean environment variable and provides a default if not found.
If `default` is not specified the function throws when the variable doesn't exist.



### Numbers

```js
var myNumber = mentalist.number(variableName, [default]);
```

Reads in and parses a numerical environment variable and provides a default if not found.
If `default` is not specified the function throws when the variable doesn't exist.



### Strings

```js
var myString = mentalist.string(variableName, [default]);
```

Reads in a string environment variable and provides a default if not found.
If `default` is not specified the function throws when the variable doesn't exist.



### Objects

```js
var myobject = mentalist.object(variableName, [default]);
```

Reads in an object from an environment variable and provides a default if not found.
If `default` is not specified the function throws when the variable doesn't exist.


