'use strict';

var Microbot = require('../');
var microbot = new Microbot({a: 'b'});
microbot.when(function(payload, options) {
  console.log(payload);
  //=> {foo: 'bar'}
  console.log(options);
  //=> {a: 'b', c: 'd'}
  return Promise.resolve({bar: 'baz'});
});

microbot.dispatch({foo: 'bar'}, {c: 'd'})
  .then(function(results) {
    console.log(results);
  })
  .catch(function(err) {
    console.error(err);
  });
