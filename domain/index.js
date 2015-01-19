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
    this.componentName = this.className();
    this.storeName = this.className('Store');
    this.constantsName = this.className('Constants');
    this.storeFileName = camelCase(this.name + 'Store');
    this.addConstant = 'ADD_' + this.name.toUpperCase();
    this.resourceName = pluralize(camelCase(this.name));
    this.componentFileName = camelCase(this.className());
    this.addFunctionName = 'add' + str.classify(this.name);
    this.actionCreatorName = this.className('ActionCreators');
    this.constantsFileName =  camelCase(this.name + 'Constants');
    this.httpStateSourceName = this.className('HttpStateSource');
    this.actionCreatorFileName = camelCase(this.name + 'ActionCreators');
    this.sourceActionCreatorName = this.className('SourceActionCreators');
    this.httpStateSourceFileName = camelCase(this.name + 'HttpStateSource');
    this.sourceActionCreatorFileName = camelCase(this.name + 'SourceActionCreators');
  },
  className: function (type) {
    return str.classify(this.name + (type || ""));
  },
  writing: function () {
    this.template('store.js', filePath('stores', this.storeName));
    this.template('constants.js', filePath('constants', this.constantsName));
    this.template('component.js', filePath('components', this.componentName));
    this.template('actionCreator.js', filePath('actions', this.actionCreatorName));
    this.template('httpStateSource.js', filePath('sources', this.httpStateSourceName));
    this.template('sourceActionCreator.js', filePath('actions', this.sourceActionCreatorName));

    this.addClientRoute();
    this.addServerRoute();
    this.addNavigationActionCreator();
  },
  addClientRoute: function () {
    var routes = 'var routes = [';
    var routerPath = 'app/router.js';
    var route = format('  <Route name="%s" path="/%s/:id" handler={require(\'./components/%s\')} />,',
      camelCase(this.name), this.resourceName, this.componentFileName
    );
    var routerContent = this.readFileAsString(routerPath).replace(routes, routes + '\n' + route);

    this.write(routerPath, routerContent);
  },
  addNavigationActionCreator: function () {
    var end = '  }\n});'
    var creatorPath = 'app/actions/navigationActionCreators.js';
    var creator = format('  },\n  navigateTo%s: function (id) {\n    navigateTo(\'%s\', { id: id });',
      this.componentName,
      camelCase(this.name)
    );
    var creatorContent = this.readFileAsString(creatorPath).replace(end, creator + '\n' + end);

    this.write(creatorPath, creatorContent);
  },
  addServerRoute: function () {
    var exports = 'module.exports = app;';
    var serverPath = 'app/server/index.js';
    var routeName = 'get' + str.classify(this.name);
    var clientRoute = format('app.get(\'/%s/:id\', require(\'./routes/index\'));', this.resourceName);
    var apiRoute = format('app.get(\'/api/%s/:id\', require(\'./routes/%s\'));', this.resourceName, routeName);

    this.template('route.js', format('app/server/routes/%s.js', routeName));

    var serverContents = this.readFileAsString(serverPath)
      .replace(exports, clientRoute + '\n' + apiRoute + '\n\n' + exports);

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