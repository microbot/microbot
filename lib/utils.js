'use strict';

var utils = module.exports = {};

utils.extend = require('extend-shallow');

utils.when = function(options, fn) {
  return function(payload, opts) {
    return fn.call(this, payload, utils.extend({}, this.options, options, opts));
  };
};
