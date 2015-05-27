var Marty = require('marty');
var <%= constantsName %> = require('../constants/<%= constantsFileName %>');

var <%= queryName %> = Marty.createActionCreators({
  getById(id) {
    return this.app.<%= httpStateSourceFileName %>.getById(id)
      .then((res) => this.dispatch(<%= constantsName %>.<%= receiveConstant %>, res.body, id))
      .catch((err) => this.dispatch(<%= constantsName %>.<%= receiveConstant %>_FAILED, err, id));
  }
});

module.exports = <%= queryName %>;