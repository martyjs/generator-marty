var format = require('util').format;
var pluralize = require('pluralize');
var str = require('underscore.string');
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The domain name'
    });

    this.name = camelCase(this.name);
    this.viewName = this.className();
    this.storeName = this.className('Store');
    this.queryName = this.className('Query');
    this.viewFileName = camelCase(this.className());
    this.httpStateSourceName = this.className('API');
    this.constantsName = this.className('Constants');
    this.storeFileName = camelCase(this.name + 'Store');
    this.resourceName = pluralize(camelCase(this.name));
    this.queryFileName = camelCase(this.name + 'Query');
    this.addFunctionName = 'add' + str.classify(this.name);
    this.actionCreatorName = this.className('ActionCreators');
    this.receiveConstant = 'RECEIVE_' + this.name.toUpperCase();
    this.constantsFileName =  camelCase(this.name + 'Constants');
    this.actionCreatorFileName = camelCase(this.name + 'ActionCreators');
    this.httpStateSourceFileName = camelCase(this.name + 'API');
  },
  className: function (type) {
    return str.classify(this.name + (type || ""));
  },
  writing: function () {
    this.template('view.js', filePath('views', this.viewName));
    this.template('store.js', filePath('stores', this.storeName));
    this.template('query.js', filePath('queries', this.queryName));
    this.template('constants.js', filePath('constants', this.constantsName));
    this.template('actionCreator.js', filePath('actions', this.actionCreatorName));
    this.template('httpAPI.js', filePath('sources', this.httpStateSourceName));

    this.addClientRoute();
    this.addServerRoute();
    this.addNavigationActionCreator();
  },
  addClientRoute: function () {
    var routes = 'module.exports = [';
    var routerPath = 'app/router/routes.js';
    var route = format('  <Route name="%s" path="/%s/:id" handler={require(\'../views/%s\')} />,',
      camelCase(this.name), this.resourceName, this.viewFileName
    );
    var routerContent = this.readFileAsString(routerPath).replace(routes, routes + '\n' + route);

    this.write(routerPath, routerContent);
  },
  addNavigationActionCreator: function () {
    var end = '  }\n});'
    var creatorPath = 'app/actions/navigationActionCreators.js';
    var creator = format('  },\n  navigateTo%s: function (id) {\n    navigateTo(\'%s\', { id: id });',
      this.viewName,
      camelCase(this.name)
    );
    var creatorContent = this.readFileAsString(creatorPath).replace(end, creator + '\n' + end);

    this.write(creatorPath, creatorContent);
  },
  addServerRoute: function () {
    var exports = 'module.exports = app;';
    var serverPath = 'app/server/index.js';
    var routeName = 'get' + str.classify(this.name);
    var apiRoute = format('app.get(\'/api/%s/:id\', require(\'./routes/%s\'));', this.resourceName, routeName);

    this.template('route.js', format('app/server/routes/%s.js', routeName));

    var serverContents = this.readFileAsString(serverPath)
      .replace(exports, apiRoute + '\n\n' + exports);

    this.write(serverPath, serverContents);
  }
});

function filePath(type, className) {
  return 'app/' + type + '/' + camelCase(className) + '.js';
}

function camelCase(s) {
  s = str.classify(s);
  s = s[0].toLowerCase() + s.substring(1);
  return s;
}