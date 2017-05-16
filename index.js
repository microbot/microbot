'use strict';

var Github = require('github-base');
var extend = require('extend-shallow');
var koalas = require('koalas');

module.exports = function(config) {
  var github;
  var githubAuth = require('bot-github-auth')(config);
  return function(fn) {
    if (typeof fn !== 'function') {
      fn = function(payload) {
        return payload;
      };
    }

    return function(payload) {
      var data = fn(payload);
      if (data === false) {
        return Promise.resolve(payload);
      }

      if (github) {
        return send(payload, data);
      }

      return githubAuth()
        .then(function(auth) {
          github = new Github(extend({}, config, auth));
          return send(payload, data);
        });
    };
  };

  function send(payload, data) {
    var opts = normalizeOpts(payload, data);
    return new Promise(function(resolve, reject) {
      github.post('/repos/:owner/:repo/issues/:number/comments', opts, function(err, data, res) {
        if (err) {
          err.code = 500;
          err.payload = payload;
          err.data = opts;
          return reject(err);
        }
        if (res.statusCode < 200 || res.statusCode >= 300) {
          err = new Error(res.statusMessage);
          err.code = +res.statusCode;
          err.payload = payload;
          err.data = opts;
          return reject(err);
        }

        resolve({
          status: 'success',
          code: res.statusCode,
          message: res.statusMessage,
          payload: payload,
          data: opts,
          results: data
        });
      });
    });
  }

  function normalizeOpts(payload, data) {
    if (typeof data === 'string') {
      data = {body: data};
    }
    return {
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      number: payload.issue.number,
      body: koalas(data.body, payload.body)
    };
  }
};
