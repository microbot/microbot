'use strict';

var debug = require('debug')('bot-base');
var utils = module.exports = {};

utils.extend = require('extend-shallow');

utils.wrapAction = function(fn) {
  return function(payload, options) {
    var opts = utils.extend({}, this.options, options);
    return fn.call(this, payload, opts);
  };
};

utils.rename = function(name) {
  debug('rename', name);
  if (/^(before|after)/.test(name)) {
    if (name === 'before' || name === 'after') {
      return `${name}.all`;
    }

    var val = name.split(/[._-]/).join('.');
    debug('rename replace', val);
    return val;
  }
  return name;
};

utils.series = function(thisArg, arr, ...args) {
  arr = utils.arrayify(arr);

  // immediately return if the array has only 1 item
  var first = arr.shift();
  var init = first ? first.apply(thisArg, args) : args[0];

  if (arr.length === 0) {
    return Promise.resolve(init);
  }

  return Promise.resolve(arr.reduce(function(acc, cur) {
    // continue if the current item is empty
    if (!cur) {
      return acc;
    }

    // remove the first arg (will be replaced with `acc`)
    var [, ...rest] = args;

    // resolve accumlated value, then return current promise
    return Promise.resolve(acc)
      .then(function(res) {
        return cur.apply(thisArg, [res, ...rest]);
      });
  }, init))
};

utils.arrayify = function(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
};
