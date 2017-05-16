'use strict';

var BaseBot = require('../');
var bot = new BaseBot({a: 'b'});
bot.when({c: 'd'}, function(payload, options) {
  console.log(payload);
  //=> {foo: 'bar'}
  console.log(options);
  //=> {a: 'b', c: 'd'}
  return Promise.resolve({bar: 'baz'});
});

bot.dispatch({foo: 'bar'})
  .then(function(results) {
    console.log(results);
  })
  .catch(function(err) {
    console.error(err);
  });
