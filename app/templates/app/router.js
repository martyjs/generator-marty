/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Home = require('./components/home');
var Route = Router.Route;

var routes = [
  <Route name="home" path="/" handler={Home} />
];

module.exports = Router.create({
  routes: routes,
  location: Router.HistoryLocation
});