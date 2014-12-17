mentalist [![Build Status](https://travis-ci.org/Janpot/mentalist.svg)](https://travis-ci.org/Janpot/mentalist)
=========

Read and parse environment variables

## install

    $ npm i mentalist

## API

    var mentalist = require('mentalist');

The purpose of this module is to read in variables at the start of the program and provide defaults or throw in case it are required parameters.

### Booleans

    mentalist.bool(variableName, [default]);

Reads in and parses a boolean environment variable and provides a default if not found.
If `default` is not specified the function throws when the variable doesn't exist.



### Numbers

    mentalist.number(variableName, [default]);

Reads in and parses a numerical environment variable and provides a default if not found.
If `default` is not specified the function throws when the variable doesn't exist.



### Strings

    mentalist.string(variableName, [default]);

Reads in a string environment variable and provides a default if not found.
If `default` is not specified the function throws when the variable doesn't exist.



### Objects

    mentalist.object(variableName, [default]);

Reads in an object from an environment variable and provides a default if not found.
If `default` is not specified the function throws when the variable doesn't exist.


