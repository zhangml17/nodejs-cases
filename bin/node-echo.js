#! /usr/bin/env node

var argv = require('argv');
var echo = require('../lib/echo');

var args = argv.run();
console.log(echo(args.targets.join(' ')));
