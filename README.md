# microbot [![NPM version](https://img.shields.io/npm/v/microbot.svg?style=flat)](https://www.npmjs.com/package/microbot) [![NPM monthly downloads](https://img.shields.io/npm/dm/microbot.svg?style=flat)](https://npmjs.org/package/microbot)  [![NPM total downloads](https://img.shields.io/npm/dt/microbot.svg?style=flat)](https://npmjs.org/package/microbot)

> Create cyborg microbots to react to events and automate tasks.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save microbot
```

Install with [yarn](https://yarnpkg.com):

```sh
$ yarn add microbot
```

## Usage

```js
var Microbot = require('microbot');
```

## API

### [Microbot](index.js#L20)

Create a new Microbot instance with the provided options.

**Params**

* `options` **{Object}**: Options used to configure the new microbot.

**Example**

```js
var microbot = new Microbot({a: 'b'});
```

### [.when](index.js#L56)

Register a handler function to be called when the microbot is activated.

**Params**

* `fn` **{Function}**: Handler function that will be called with a `payload` and `options`. The handler function should return a `Promise`.
* `returns` **{Object}**: Returns `this` for chaining

**Example**

```js
microbot.when(function(payload, options) {
  console.log(payload);
  //=> {foo: 'bar'}
  console.log(options);
  //=> {a: 'b', c: 'd'}
  return Promise.resolve({bar: 'baz'});
});
```

### [.action](index.js#L81)

Register an action handler function using the given name.

**Params**

* `name` **{String}**: Name of the action handler function.
* `fn` **{Function}**: Action handler function to be called when the action is dispatched.
* `returns` **{Object}**: Returns `this` to allow chaining

**Example**

```js
microbot.action('foo', function(payload, options) {
  return Promise.resolve(payload.foo);
});
microbot.dispatch('foo', {foo: 'bar'})
  .then(function(result) {
    console.log(result);
    //=> 'bar'
  });
```

### [.dispatch](index.js#L108)

Dispatches a payload by calling the registered action handler function.

**Params**

* `name` **{String}**: Name of the action to dispatch. Defaults to "when".
* `payload` **{Object}**: Payload object to send to the action handler function.
* `options` **{Object}**: Additional options to send to the action handler function.
* `returns` **{Promise}**: Returns a promise after the action handler function has resolved.

**Example**

```js
microbot.dispatch({foo: 'bar'}, {c: 'd'})
  .then(function(results) {
    console.log(results);
    //=> {bar: 'baz'}
  });
```

## About

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Please read the [contributing guide](.github/contributing.md) for advice on opening issues, pull requests, and coding standards.

### Building docs

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Brian Woodward**

* [github/doowb](https://github.com/doowb)
* [twitter/doowb](https://twitter.com/doowb)

### License

Copyright © 2017, [Brian Woodward](https://doowb.com).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on May 25, 2017._