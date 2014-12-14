var Marty = require('marty');
var <%= httpApiName %> = require('../apis/<%= httpApiFileName %>');
var <%= constantsName %> = require('../constants/<%= constantsFileName %>');

var <%= storeName %> = Marty.createStore({
  handlers: {
    <%= addFunctionName %>: <%= constantsName %>.<%= addConstant %>
  },
  getInitialState: function () {
    return {};
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
        return <%= httpApiName %>.getById(id);
      }
    );
  }
});

module.exports = <%= storeName %>;