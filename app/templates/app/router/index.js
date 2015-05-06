var Marty = require('marty');
var routes = require('./routes');
var Router = require('react-router');

module.exports = Router.create({
  routes: routes,
  location: Marty.isBrowser ? Router.HistoryLocation : null
});