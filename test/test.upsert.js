"use strict";

var upsert = require('../lib/upsert');
var Promise = require('bluebird');

describe('upsert', function () {
  it('should throw an error with no doc id', function () {
    return upsert().should.be.rejected;
  });
  it('should throw an error if the doc errors', function () {
    return upsert({
      get: function (foo, cb) {
        cb(new Error('a fake error!'));
      }
    }, 'foo').should.be.rejected;
  });
  it('should fulfill if the diff returns false', function () {
    return upsert({
      get: function (foo, cb) {
        cb(null, 'lalala');
      }
    }, 'foo', function () {
      return false;
    }).should.become('lalala');
  });
  it('should error if it can\'t put', function () {
    return upsert({
      get: function (foo, cb) {
        cb(null, 'lalala');
      },
      put: function () {
        return Promise.reject(new Error('falala'));
      }
    }, 'foo', function () {
      return true;
    }).should.be.rejected;
  });
});
