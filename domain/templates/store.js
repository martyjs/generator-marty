var _ = require('lodash');
var Marty = require('marty');
var <%= queryName %> = require('../queries/<%= queryFileName %>');
var <%= constantsName %> = require('../constants/<%= constantsFileName %>');

var <%= storeName %> = Marty.createStore({
  id: '<%= storeName %>',
  handlers: {
    <%= addFunctionName %>: <%= constantsName %>.<%= receiveConstant %>
  },
  getInitialState() {
    return {};
  },
  getAll() {
    return _.values(this.state);
  },
  <%= addFunctionName %>(<%= name %>) {
    this.state[<%= name %>.id] = <%= name %>;
    this.hasChanged();
  },
  getById(id) {
    return this.fetch({
      id: id,
      locally() {
        return this.state[id];
      },
      remotely() {
        return <%= queryName %>.for(this).getById(id);
      }
    });
  }
});

module.exports = <%= storeName %>;