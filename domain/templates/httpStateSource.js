var Marty = require('marty');
var <%= sourceActionCreatorName %> = require('../actions/<%= sourceActionCreatorFileName %>');

var <%= httpStateSourceName %> = Marty.createStateSource({
  type: 'http',
  getById: function (id) {
    return this.get('/api/<%= resourceName %>/' + id).then(function (res) {
      return <%= sourceActionCreatorName %>.<%= addFunctionName %>(res.body);
    });
  }
});

module.exports = <%= httpStateSourceName %>;