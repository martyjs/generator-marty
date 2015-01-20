var _ = require('lodash');
var Marty = require('marty');
var <%= constantsName %> = require('constants/<%= constantsFileName %>');
var <%= httpStateSourceName %> = require('sources/<%= httpStateSourceFileName %>');

var <%= storeName %> = Marty.createStore({
  displayName: '<%= storeName %>',
  handlers: {
    <%= addFunctionName %>: <%= constantsName %>.<%= addConstant %>
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
        return <%= httpStateSourceName %>.getById(id);
      }
    );
  }
});

module.exports = <%= storeName %>;