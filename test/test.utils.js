"use strict";

var utils = require('../lib/utils');
var Promise = require('bluebird');
var chai = require('chai');
var should = chai.should();
chai.use(require("chai-as-promised"));

describe('utils', function () {
  it('callbackify should work with a callback', function (done) {
    function fromPromise() {
      return Promise.resolve(true);
    }
    utils.callbackify(fromPromise)(function (err, resp) {
      should.not.exist(err);
      should.exist(resp);
      done();
    });
  });
  it('fin should work without returning a function and it resolves', function () {
    return utils.fin(Promise.resolve(), function () {
      return {};
    }).should.be.fullfilled;
  });
  it('fin should work without returning a function and it rejects', function () {
    return utils.fin(Promise.reject(), function () {
      return {};
    }).should.be.rejected;
  });
});
