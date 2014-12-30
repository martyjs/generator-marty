var Marty = require('marty');
var <%= serverActionCreatorName %> = require('../actions/<%= serverActionCreatorFileName %>');

var <%= httpApiName %> = Marty.createHttpAPI({
  getById: function (id) {
    return this.get('/api/<%= resourceName %>/' + id).then(function (res) {
      return <%= serverActionCreatorName %>.<%= addFunctionName %>(res.body);
    });
  }
});

module.exports = <%= httpApiName %>;