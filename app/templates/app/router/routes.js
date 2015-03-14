var React = require('react');
var Route = require('react-router/build/npm').Route;

module.exports = [
  <Route name="home" path="/" handler={require('../views/home')} />
];