var Marty = require('marty');

var <%= constantsName %> = Marty.createConstants([
  '<%= receiveConstant %>'
]);

module.exports = <%= constantsName %>;