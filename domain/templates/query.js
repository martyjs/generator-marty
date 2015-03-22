var Marty = require('marty');
var <%= constantsName %> = require('../constants/<%= constantsFileName %>');
var <%= httpStateSourceName %> = require('../sources/<%= httpStateSourceFileName %>');

var <%= queryName %> = Marty.createActionCreators({
  id: '<%= queryName %>',
  getById(id) {
    return <%= httpStateSourceName %>.for(this).getById(id)
      .then((res) => this.dispatch(<%= constantsName %>.<%= receiveConstant %>, res.body, id))
      .catch((err) => this.dispatch(<%= constantsName %>.<%= receiveConstant %>_FAILED, err, id));
  }
});

module.exports = <%= queryName %>;