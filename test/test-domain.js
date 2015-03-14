'use strict';

var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var tmpdir = path.join(__dirname, 'tmp');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('marty:domain', function () {
  var dir;
  before(function (done) {
    dir = path.join(os.tmpdir(), './temp-test-domain');

     helpers.run(path.join(__dirname, '../app'))
      .inDir(dir)
      .withOptions({ 'skip-install': true })
      .withPrompt({
        name: 'Test App'
      })
      .on('end', function () {
        helpers.run(path.join(__dirname, '../domain'))
          .withArguments(['foo'])
          .on('end', done);
      });
  });

  it('sets the readme display name', function () {
    assert.fileContent('README.md', /#Test App/);
  });
});
