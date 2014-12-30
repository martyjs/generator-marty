var Marty = require('marty');
var <%= constantsName %> = require('../constants/<%= constantsName %>');

var <%= serverActionCreatorName %> = Marty.createActionCreators({
  <%= addFunctionName %>: <%= constantsName %>.<%= addConstant %>(function (<%= name %>) {
    this.dispatch(<%= name %>);
  })
});

module.exports = <%= serverActionCreatorName %>;