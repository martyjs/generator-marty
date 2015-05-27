var Marty = require('marty');

var <%= httpStateSourceName %> = Marty.createStateSource({
  type: 'http',
  getById(id) {
    return this.get('/api/<%= resourceName %>/' + id);
  }
});

module.exports = <%= httpStateSourceName %>;