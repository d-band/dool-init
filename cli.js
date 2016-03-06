#!/usr/bin/env node

'use strict';
var program = require('commander');
var resolve = require('path').resolve;

program
  .version(require('./package').version, '-v, --version')
  .usage('[options] <path>')
  .option('--prefix [prefix]', 'Repo prefix for search [dool-template-]', 'dool-template-')
  .parse(process.argv);

program.cwd = resolve(program.args[0] || '.');

require('./lib')(program);