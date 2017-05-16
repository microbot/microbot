'use strict';

var utils = require('../lib/utils');
var BaseBot = require('../');

var bot = new BaseBot({a: 'b'});
bot.use(function() {
  this.action('before_when', function(payload, options) {
    console.log('payload before_when', payload);
    console.log('options before_when', options);
    payload.before = 'before';
    return payload;
  });

  this.action('after_when', function(payload, options) {
    console.log('payload after_when', payload);
    console.log('options after_when', options);
    payload.after = 'after';
    return payload;
  });
});

bot.when({c: 'd'}, function(payload, options) {
  console.log('payload when', payload);
  //=> {foo: 'bar'}
  console.log('options when', options);
  //=> {a: 'b', c: 'd'}
  return Promise.resolve({bar: 'baz'});
});

bot.dispatch({foo: 'bar'})
  .then(function(results) {
    console.log('finaly results', results);
  })
  .catch(function(err) {
    console.error('error', err);
  });
