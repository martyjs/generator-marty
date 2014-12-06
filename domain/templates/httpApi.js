var Marty = require('marty');
var <%= serverActionCreatorName %> = require('../actions/<%= serverActionCreatorFileName %>');

var <%= httpApiName %> = Marty.createHttpAPI({
  getById: function (id) {
    return this.get('/api/<%= resourceName %>/' + id).then(function (<%= name %>) {
      return <%= serverActionCreatorName %>.<%= addFunctionName %>(<%= name %>);
    });
  }
});

module.exports = <%= httpApiName %>;