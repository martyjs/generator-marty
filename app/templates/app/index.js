var _ = require('lodash');
var Marty = require('marty');
var bulk = require('bulk-require');

var App = Marty.createApplication(function () {

  this.router = require('./router');

  _.each(bulk(__dirname, [
    'stores/*.js',
    'actions/*.js',
    'queries/*.js',
    'sources/*.js'
  ]), this.register, this);
});

module.exports = App;