/** @jsx React.DOM */

var React = require('react');
var Marty = require('marty');
var Router = require('./router');

window.React = React; // For React DevTools

Router.run(function (Handler) {
  React.render(<Handler />, document.getElementById('app'));
});