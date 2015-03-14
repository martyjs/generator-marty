var Marty = require('marty');

var <%= httpStateSourceName %> = Marty.createStateSource({
  type: 'http',
  id: '<%= httpStateSourceName %>',
  getById: function (id) {
    return this.get('/api/<%= resourceName %>/' + id);
  }
});

module.exports = <%= httpStateSourceName %>;