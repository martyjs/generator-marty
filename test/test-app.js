'use strict';

var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var tmpdir = path.join(__dirname, 'tmp');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('marty:app', function () {
  var dir;
  before(function (done) {
    dir = path.join(os.tmpdir(), './temp-test');
    helpers.run(path.join(__dirname, '../app'))
      .inDir(dir)
      .withOptions({ 'skip-install': true })
      .withPrompt({
        name: 'Test App'
      })
      .on('end', done);

    console.log(dir);
  });

  it('creates project files', function () {
    assert.file(['.jshintrc']);
  });

  it('should create the app folders', function () {
    ['app'].forEach(function (folder) {
      expect(fs.existsSync(path.join(dir, folder))).to.be.true;
    })
  });

  it('sets the packages name', function () {
    assert.fileContent('package.json', /"name": "test-app"/);
  });

   it('sets the readme display name', function () {
    assert.fileContent('README.md', /#Test App/);
  });
});
