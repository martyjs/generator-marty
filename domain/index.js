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
    this.httpApiName = this.className('HttpAPI');
    this.constantsName = this.className('Constants');
    this.storeFileName = camelCase(this.name + 'Store');
    this.addConstant = 'ADD_' + this.name.toUpperCase();
    this.resourceName = pluralize(camelCase(this.name));
    this.addFunctionName = 'add' + str.classify(this.name);
    this.httpApiFileName = camelCase(this.name + 'HttpApi');
    this.actionCreatorName = this.className('ActionCreators');
    this.constantsFileName =  camelCase(this.name + 'Constants');
    this.actionCreatorFileName = camelCase(this.name + 'ActionCreators');
    this.serverActionCreatorName = this.className('ServerActionCreators');
    this.serverActionCreatorFileName = camelCase(this.name + 'ServerActionCreators');
  },
  className: function (type) {
    return str.classify(this.name + (type || ""));
  },
  writing: function () {
    this._ = str;
    this.camelCase = camelCase;
    this.template('store.js', filePath('stores', this.storeName));
    this.template('httpApi.js', filePath('apis', this.httpApiName));
    this.template('constants.js', filePath('constants', this.constantsName));
    this.template('component.js', filePath('components', this.componentName));
    this.template('actionCreator.js', filePath('actions', this.actionCreatorName));
    this.template('serverActionCreator.js', filePath('actions', this.serverActionCreatorName));
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