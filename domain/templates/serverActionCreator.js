var Marty = require('marty');

var <%= serverActionCreatorName %> = Marty.createActionCreator({
  <%= addFunctionName %>: function (<%= name %>) {
    this.dispatch(<%= name %>);
  }
});

module.exports = <%= serverActionCreatorName %>;