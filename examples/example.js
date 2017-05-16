'use strict';

var config = {force: true};
var comment = require('../')(config);
var payload = require('./payload.json');

Promise.resolve(payload)
  .then(comment(function(payload) {
    return `Hi ${payload.issue.user.login}, it's nice to see you!`;
  }))
  .then(console.log.bind(null, 'result'))
  .catch(console.error.bind(null, 'error'));
