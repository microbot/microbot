'use strict';

var utils = require('../lib/utils');
var BaseBot = require('../');

var bot = new BaseBot({a: 'b'});
bot.use(function() {
  this.action('before', function(payload, options) {
    console.log('before payload', payload);
    console.log('before options', options);
    console.log();
    payload.before = 'before';
    return payload;
  });

  this.action('before.when', function(payload, options) {
    console.log('before.when payload', payload);
    console.log('before.when options', options);
    console.log();
    payload.beforeWhen = 'before.when';
    return payload;
  });

  this.action('after.when', function(payload, options) {
    console.log('after.when payload', payload);
    console.log('after.when options', options);
    console.log();
    payload.afterWhen = 'after.when';
    return payload;
  });

  this.action('after', function(payload, options) {
    console.log('after payload', payload);
    console.log('after options', options);
    console.log();
    payload.after = 'after';
    return payload;
  });
});

bot.when(function(payload, options) {
  console.log('when payload', payload);
  //=> {foo: 'bar'}
  console.log('when options', options);
  //=> {a: 'b', c: 'd'}
  console.log();
  return Promise.resolve({bar: 'baz'});
});

bot.dispatch({foo: 'bar'}, {c: 'd'})
  .then(function(results) {
    console.log('final results', results);
  })
  .catch(function(err) {
    console.error('error', err);
  });
