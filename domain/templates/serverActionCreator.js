var Marty = require('marty');

var <%= serverActionCreatorName %> = Marty.createActionCreators({
  <%= addFunctionName %>: function (<%= name %>) {
    this.dispatch(<%= name %>);
  }
});

module.exports = <%= serverActionCreatorName %>;