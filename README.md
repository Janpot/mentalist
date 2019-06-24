# mentalist

Environment variable parsing for configuring applications.

[![Build Status](https://travis-ci.org/Janpot/mentalist.svg)](https://travis-ci.org/Janpot/mentalist)

## installation

    $ npm i mentalist

## introduction

This module is intended to be used to load a configuration when you store parameters in environment variables.
Several parse methods are provided to read, parse and default a configuration value.
All parsing methods will throw when a variable is not defined and no default is specified.
Don't like this behavior? Always specify a default value, use `undefined` for default in case you want it to be optional.

## API

```js
var mentalist = require("mentalist");
```

### Existence

```js
if (mentalist.has(variableName)) {
  // ...
}
```

Checks for existence of a variable in the environment.

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
