'use strict';

var config = {force: true};
var comment = require('../')(config);
var payload = require('./payload.json');

Promise.resolve(payload)
  .then(comment(function(payload) {
    return payload.message || `Hi ${payload.issue.user.login}, it's nice to see you!`;
  }))
  .then(function(result) {
    var user = result.results.user;
    var url = result.results.html_url;
    console.log(`Thanks for the comment ${user.login}!`);
    console.log(`See your comment here: ${url}`);
  })
  .catch(console.error.bind(null, 'error'));
