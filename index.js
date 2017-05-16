'use strict';
var Base = require('base');
var plugin = require('base-plugins');
var option = require('base-options');

var debug = require('debug')('bot-base');
var utils = require('./lib/utils');

/**
 * Create a new BotBase instance with the provided options.
 *
 * ```js
 * var bot = new BotBase({a: 'b'});
 * ```
 *
 * @param {Object} `options` Options used to configure the new bot.
 * @api public
 */

function BotBase(options) {
  if (!(this instanceof BotBase)) {
    return new BotBase(options);
  }
  debug('initializing BotBase');

  Base.call(this, null, options);
  this.use(plugin());
  this.use(option());

  this.define('_actions', {})
}

/**
 * Extend Base onto BotBase
 */

Base.extend(BotBase);

/**
 * Register a handler function to be called when the bot is activated.
 *
 * ```js
 * bot.when({c: 'd'}, function(payload, options) {
 *   console.log(payload);
 *   //=> {foo: 'bar'}
 *   console.log(options);
 *   //=> {a: 'b', c: 'd'}
 *   return Promise.resolve({bar: 'baz'});
 * });
 * ```
 * @param  {Object} `options` Additional options to pass to the handler function.
 * @param  {Function} `fn` Handler function that will be called with a `payload` and `options`. The handler function should return a `Promise`.
 * @return {Object} Returns `this` for chaining
 * @api public
 */

BotBase.prototype.when = function(options, fn) {
  debug('adding `when` action handler');
  if (typeof options === 'function') {
    fn = options;
    options = {};
  }

  var opts = utils.extend({}, options);
  this.action('when', utils.when(opts, fn));
  return this;
};


/**
 * Register an action handler function using the given name.
 *
 * ```js
 * bot.action('foo', function(payload, options) {
 *   return Promise.resolve(payload.foo);
 * });
 * bot.dispatch('foo', {foo: 'bar'})
 *   .then(function(result) {
 *     console.log(result);
 *     //=> 'bar'
 *   });
 * ```
 * @param  {String} `name` Name of the action handler function.
 * @param  {Function} `fn` Action handler function to be called when the action is dispatched.
 * @return {Object} Returns `this` to allow chaining
 * @api public
 */

BotBase.prototype.action = function(name, fn) {
  if (typeof fn === 'function') {
    debug('setting action handler "%s"', name);
    this.actions[name] = fn;
    return this;
  }
  debug('getting action handler "%s"', name);
  return this.actions[name];
};

/**
 * Dispatches a payload by calling the registered action handler function.
 *
 * ```js
 * bot.dispatch('action', {foo: 'bar'})
 *   .then(function(results) {
 *     console.log(results);
 *     //=> {bar: 'baz'}
 *   });
 * ```
 * @param  {String} `name` Name of the action to dispatch
 * @param  {Object} `payload` Payload object to send to the action handler function.
 * @param  {Object} `options` Additional options to send to the action handler function.
 * @return {Promise} Returns a promise after the action handler function has resolved.
 * @api public
 */

BotBase.prototype.dispatch = function(name, payload, options) {
  this.emit('dispatch', payload);
  var action = this.action(name);
  if (!action) {
    debug('action handler "%s" could not be found to dispatch', name);
    return Promise.resolve();
  }
  debug('dispatching payload %j to action handler "%s"', payload, name);
  return Promise.resolve(action.call(this, payload, options));
};

/**
 * Exposes `BotBase`
 */

module.exports = BotBase;
