var routes = require('./routes');
var Router = require('react-router/build/npm');

module.exports = Router.create({
  routes: routes,
  location: Router.HistoryLocation
});