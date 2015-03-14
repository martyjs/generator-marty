var _ = require('lodash');
var Marty = require('marty');
var <%= queryName %> = require('../queries/<%= queryFileName %>');
var <%= constantsName %> = require('../constants/<%= constantsFileName %>');

var <%= storeName %> = Marty.createStore({
  id: '<%= storeName %>',
  handlers: {
    <%= addFunctionName %>: <%= constantsName %>.<%= receiveConstant %>
  },
  getInitialState: function () {
    return {};
  },
  getAll: function () {
    return _.values(this.state);
  },
  <%= addFunctionName %>: function (<%= name %>) {
    this.state[<%= name %>.id] = <%= name %>;
    this.hasChanged();
  },
  getById: function (id) {
    return this.fetch(id,
      function () {
        return this.state[id];
      },
      function () {
        return <%= queryName %>.for(this).getById(id);
      }
    );
  }
});

module.exports = <%= storeName %>;