var Marty = require('marty');
var <%= constantsName %> = require('constants/<%= constantsFileName %>');

var <%= sourceActionCreatorName %> = Marty.createActionCreators({
  <%= addFunctionName %>: <%= constantsName %>.<%= addConstant %>(function (<%= name %>) {
    this.dispatch(<%= name %>);
  })
});

module.exports = <%= sourceActionCreatorName %>;