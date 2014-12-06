var Marty = require('marty');

var <%= constantsName %> = Marty.createConstants([
  '<%= addConstant %>'
]);

module.exports = <%= constantsName %>;