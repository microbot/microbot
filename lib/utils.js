'use strict';

var utils = module.exports = {};

utils.extend = require('extend-shallow');

utils.wrapAction = function(options, fn) {
  return function(payload, opts) {
    return fn.call(this, payload, utils.extend({}, this.options, options, opts));
  };
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
